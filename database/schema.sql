-- MIS PORTAL DATABASE SCHEMA
CREATE DATABASE IF NOT EXISTS mis_portal;
USE mis_portal;

-- TABLE 1: tbl_Region
CREATE TABLE tbl_Region (
    RegionID INT PRIMARY KEY AUTO_INCREMENT,
    RegionName VARCHAR(100) NOT NULL,
    Zone VARCHAR(100) NOT NULL,
    State VARCHAR(100) NOT NULL,
    City VARCHAR(100) NOT NULL,
    IsActive BOOLEAN DEFAULT TRUE,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- TABLE 2: tbl_Product
CREATE TABLE tbl_Product (
    ProductID INT PRIMARY KEY AUTO_INCREMENT,
    ProductCode VARCHAR(50) UNIQUE NOT NULL,
    Name VARCHAR(100) NOT NULL,
    Category VARCHAR(100) NOT NULL,
    Unit ENUM('Bottle', 'Case', 'Crate') NOT NULL,
    IsActive BOOLEAN DEFAULT TRUE,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- TABLE 3: tbl_Users
CREATE TABLE tbl_Users (
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    Username VARCHAR(100) UNIQUE NOT NULL,
    PasswordHash VARCHAR(255) NOT NULL,
    Role ENUM('Admin', 'Manager', 'Sales Executive', 'Viewer') NOT NULL,
    Email VARCHAR(150) UNIQUE NOT NULL,
    IsActive BOOLEAN DEFAULT TRUE,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- TABLE 4: tbl_SalesPerson
CREATE TABLE tbl_SalesPerson (
    SP_ID INT PRIMARY KEY AUTO_INCREMENT,
    SP_Code VARCHAR(50) UNIQUE NOT NULL,
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(150) UNIQUE NOT NULL,
    RegionID INT NOT NULL,
    ManagerID INT NULL,
    IsActive BOOLEAN DEFAULT TRUE,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_salesperson_region
    FOREIGN KEY (RegionID)
    REFERENCES tbl_Region(RegionID)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,

    CONSTRAINT fk_salesperson_manager
    FOREIGN KEY (ManagerID)
    REFERENCES tbl_Users(UserID)
    ON DELETE SET NULL
    ON UPDATE CASCADE
);
-- TABLE 5: tbl_Target
CREATE TABLE tbl_Target (
    TargetID INT PRIMARY KEY AUTO_INCREMENT,
    SP_ID INT NOT NULL,
    ProductID INT NOT NULL,
    MonthYear DATE NOT NULL,
    TargetQty DECIMAL(10,2) NOT NULL,
    TargetValue DECIMAL(12,2) NOT NULL,
    IsActive BOOLEAN DEFAULT TRUE,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_target_salesperson
    FOREIGN KEY (SP_ID)
    REFERENCES tbl_SalesPerson(SP_ID)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

    CONSTRAINT fk_target_product
    FOREIGN KEY (ProductID)
    REFERENCES tbl_Product(ProductID)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
-- TABLE 6: tbl_Achievement
CREATE TABLE tbl_Achievement (
    AchID INT PRIMARY KEY AUTO_INCREMENT,
    SP_ID INT NOT NULL,
    ProductID INT NOT NULL,
    SaleDate DATE NOT NULL,
    AchQty DECIMAL(10,2) NOT NULL,
    AchValue DECIMAL(12,2) NOT NULL,
    CustomerName VARCHAR(150),
    Remarks VARCHAR(255),
    EntryDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    IsActive BOOLEAN DEFAULT TRUE,

    CONSTRAINT fk_achievement_salesperson
    FOREIGN KEY (SP_ID)
    REFERENCES tbl_SalesPerson(SP_ID)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

    CONSTRAINT fk_achievement_product
    FOREIGN KEY (ProductID)
    REFERENCES tbl_Product(ProductID)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

    CONSTRAINT unique_daily_entry
    UNIQUE (SP_ID, ProductID, SaleDate)
);
-- TABLE 7: tbl_AuditLog
CREATE TABLE tbl_AuditLog (
    LogID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT NOT NULL,
    Action VARCHAR(100) NOT NULL,
    TableName VARCHAR(100) NOT NULL,
    OldValue TEXT,
    NewValue TEXT,
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_audit_user
    FOREIGN KEY (UserID)
    REFERENCES tbl_Users(UserID)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- SAMPLE DATA
INSERT INTO tbl_Region
(RegionName, Zone, State, City)
VALUES
('North Region', 'North Zone', 'Uttar Pradesh', 'Ayodhya'),
('West Region', 'West Zone', 'Maharashtra', 'Mumbai');

INSERT INTO tbl_Product
(ProductCode, Name, Category, Unit)
VALUES
('P001', 'Coca Cola 500ml', 'Soft Drink', 'Bottle'),
('P002', 'Sprite 1L', 'Soft Drink', 'Bottle'),
('P003', 'Fanta 2L', 'Soft Drink', 'Bottle');

INSERT INTO tbl_Users
(Username, PasswordHash, Role, Email)
VALUES
('admin', 'hashedpassword123', 'Admin', 'admin@misportal.com'),
('manager1', 'hashedpassword123', 'Manager', 'manager@misportal.com');

INSERT INTO tbl_SalesPerson
(SP_Code, Name, Email, RegionID, ManagerID)
VALUES
('SP001', 'Rahul Sharma', 'rahul@example.com', 1, 2),
('SP002', 'Priya Singh', 'priya@example.com', 2, 2);

-- END OF SCHEMA