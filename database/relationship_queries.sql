use mis_portal;
INSERT INTO tbl_Target
(SP_ID, ProductID, MonthYear, TargetQty, TargetValue)
VALUES
(1, 1, '2026-05-01', 500, 25000),
(1, 2, '2026-05-01', 300, 18000),
(2, 2, '2026-05-01', 450, 27000),
(2, 3, '2026-05-01', 350, 21000);
INSERT INTO tbl_Achievement
(SP_ID, ProductID, SaleDate, AchQty, AchValue, CustomerName, Remarks)
VALUES
(1, 1, '2026-05-10', 420, 21000, 'Sharma Store', 'Good sales'),
(1, 2, '2026-05-11', 250, 15000, 'Gupta Mart', 'Average demand'),
(2, 2, '2026-05-12', 400, 24000, 'Singh Traders', 'Target almost achieved'),
(2, 3, '2026-05-13', 300, 18000, 'Verma Agency', 'Need improvement');
INSERT INTO tbl_AuditLog
(UserID, Action, TableName, OldValue, NewValue)
VALUES
(1, 'INSERT', 'tbl_Product', NULL, 'Added Coca Cola 500ml'),
(1, 'INSERT', 'tbl_Product', NULL, 'Added Sprite 1L'),
(2, 'UPDATE', 'tbl_Target', '300', '450'),
(2, 'INSERT', 'tbl_Achievement', NULL, 'Sales achievement added');
-- Relationship Testing Queries
-- Salesperson + Region relationship testing

SELECT 
s.Name AS SalesPerson,
r.RegionName,
r.City
FROM tbl_SalesPerson s
JOIN tbl_Region r
ON s.RegionID = r.RegionID;

-- Target + Product + Salesperson

SELECT
s.Name AS SalesPerson,
p.Name AS Product,
t.TargetQty,
t.TargetValue
FROM tbl_Target t
JOIN tbl_SalesPerson s
ON t.SP_ID = s.SP_ID
JOIN tbl_Product p
ON t.ProductID = p.ProductID;

-- Achievement Report

SELECT
s.Name AS SalesPerson,
p.Name AS Product,
a.AchQty,
a.AchValue,
a.CustomerName
FROM tbl_Achievement a
JOIN tbl_SalesPerson s
ON a.SP_ID = s.SP_ID
JOIN tbl_Product p
ON a.ProductID = p.ProductID;

select * from tbl_Product;
select * from tbl_Target;
select * from tbl_Achievement;
select * from tbl_AuditLog;
select * from tbl_Salesperson;