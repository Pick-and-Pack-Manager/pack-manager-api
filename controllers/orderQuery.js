// Import Packages
const express = require('express');
const router = express.Router();
const odbc = require('odbc');

// Database configuration
const sapB1ODBC = process.env.ODBC_SAPB1;

// *** start GET Inventory start ***
router.get('/', async (req, res) => {
    try {
        console.log('Order Query connecting...');
        const pool = await odbc.pool(sapB1ODBC);
        console.log('Connected to SAP B1 ODBC');

        // First, get the ORDR results with updated column references
        const ordrQuery = `SELECT
            ORDR.DocNum AS "orderNumber",
            ORDR.DocEntry AS "docEntry",
            ORDR.DocDueDate AS "despatchDate",
            ORDR.U_KITROUTE AS "kittingRoute",
            ORDR.U_Kitting AS "kittingDate",
            ORDR.U_COMPROUTE AS "completingRoute",
            ORDR.U_Completion AS "completingDate",
            ORDR.CardCode AS "dealerCode",
            ORDR.CardName AS "dealerName",
            ORDR.Address2 AS "dealerAddress",
            ORDR.U_CustName AS "customer",
            ORDR.U_CustAdd AS "customerAddress",
            ORDR.Comments AS "orderComments",
            ORDR.U_ASSMSTATUS AS "assemblyStatus",
            ORDR.U_COMPORDER AS "orderPriority",
            ORDR.DocStatus AS "orderStatus",
            ORDR.U_SalesCateg AS "salesCategory",
            ORDR.U_U_ActDespDate AS "actualDespatchDate"
        FROM SBO_InterTanc.dbo.ORDR ORDR
        WHERE ORDR.U_COMPROUTE = 'COM1' AND ORDR.DocStatus = 'O' AND ORDR.U_Completion = '2024/04/09'
        ORDER BY ORDR.U_COMPORDER`;

        const ordrResults = await pool.query(ordrQuery);

        // Then, for each ORDR result, find matching RDR1 entries with updated column references
        for (let order of ordrResults) {
            const rdr1Query = `SELECT
                RDR1.DocEntry AS "lineDocEntry",
                RDR1.LineStatus AS "lineStatus",
                RDR1.VisOrder AS "lineNumber",
                RDR1.ItemCode AS "itemCode",
                RDR1.Dscription AS "itemDescription",
                RDR1.U_Released AS "lineReleaseStatus",
                RDR1.U_ReleasedDate AS "lineReleaseDate",
                RDR1.U_KitCompArea AS "pickingRoute",
                RDR1.ShipDate AS "shipDate",
                RDR1.Quantity AS "requiredQty",
                RDR1.U_IssueFromWhse AS "stockLocation",
                RDR1.U_IssuedBal AS "issuedBalance",
                RDR1.U_Issued AS "issuedStatus",
                RDR1.U_IssuedDate AS "issuedDate",
                RDR1.WhsCode AS "deliveryWhse",
                OITM.InvntItem AS "inventoryItem"
            FROM SBO_InterTanc.dbo.RDR1 RDR1
            INNER JOIN SBO_InterTanc.dbo.OITM OITM ON RDR1.ItemCode = OITM.ItemCode
            WHERE RDR1.DocEntry = ?
            ORDER BY RDR1.BaseDocNum, RDR1.VisOrder`;

            const rdr1Results = await pool.query(rdr1Query, [order.docEntry]);
            order.orderLines = rdr1Results;
        }

        console.log('Order Query Complete!');
				console.log('Orders Found??? = ' + ordrResults.length)
				console.log(ordrResults[0])
        res.json(ordrResults);
    } catch (error) {
        console.error('Error running order query:', error);
        res.status(500).send('Internal Server Error');
    }
});
// *** end GET Inventory end ***

// Export module
module.exports = router;
