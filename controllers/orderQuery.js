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
					    ordr.DocNum,
					    ordr.DocEntry,
					    ordr.DocDueDate,
					    ordr.U_KITROUTE,
					    ordr.U_Kitting,
					    ordr.U_COMPROUTE,
					    ordr.U_Completion,
					    ordr.CardCode,
					    ordr.CardName,
					    ordr.Address2,
					    ordr.U_CustName,
					    ordr.U_CustAdd,
					    ordr.Comments,
					    ordr.U_ASSMSTATUS,
					    ordr.U_COMPORDER,
					    ordr.DocStatus,
					    ordr.U_SalesCateg,
					    ordr.U_U_ActDespDate
					FROM sbo_intertanc.dbo.ordr ordr
					WHERE ordr.U_COMPROUTE = 'COM1' AND ordr.DocStatus = 'O' AND ordr.U_Completion = '2024/04/11'
					ORDER BY ordr.U_COMPORDER`;

        const ordrResults = await pool.query(ordrQuery);

        // Then, for each ORDR result, find matching RDR1 entries with updated column references
        for (let order of ordrResults) {
            const rdr1Query = `SELECT
							    rdr1.DocEntry,
									rdr1.LineNum,
							    rdr1.LineStatus,
							    rdr1.VisOrder,
							    rdr1.ItemCode,
							    rdr1.Dscription,
							    rdr1.U_Released,
							    rdr1.U_ReleasedDate,
							    rdr1.U_KitCompArea,
							    rdr1.ShipDate,
							    rdr1.Quantity,
							    rdr1.U_IssueFromWhse,
							    rdr1.U_IssuedBal,
							    rdr1.U_Issued,
							    rdr1.U_IssuedDate,
							    rdr1.WhsCode,
							    oitm.InvntItem
							FROM sbo_intertanc.dbo.rdr1 rdr1
							INNER JOIN sbo_intertanc.dbo.oitm oitm ON rdr1.ItemCode = oitm.ItemCode
							WHERE rdr1.DocEntry = ?
							ORDER BY rdr1.BaseDocNum, rdr1.VisOrder`;

            const rdr1Results = await pool.query(rdr1Query, [order.DocEntry]);
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
