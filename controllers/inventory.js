// Import Packages
const express = require('express')
const router = express.Router()
const odbc = require('odbc');


// const Inventory = require('../models/inventory.js')

// const app = express()
// Database configuration
const sapB1ODBC = process.env.ODBC_SAPB1;

// Views
// *** Inventory is pulled from external source (SAP B1) and cannot be updated only read ***
// *** start GET Inventory start ***
router.get('/', async (req, res) => {
	console.log('Inventory Query connecting...')
      // Construct SQL query to fetch conversion data with necessary joins
      const query = `
			Select T0.ItemCode, T1.itmsGrpNam, T0.itemName, T2.WhsCode, T2.OnHand, Isnull(T2.StockValue,0) AS StockValue From OITM T0 inner join OITB T1 on T1.itmsGrpCod = T0.itmsGrpCod inner join OITW T2 on T2.ItemCode = T0.ItemCode where T2.OnHand <> 0 order by T2.WhsCode, T2.ItemCode
			`;
			// Execute the query
			odbc.connect(process.env.ODBC_SAPB1, async () => {console.log('Connecting to SAP B1 ODBC')
			const pool = await odbc.pool(process.env.ODBC_SAPB1);
			console.log('INTERTANC POOL CREATED!' + pool)
			console.log('Running Query' + query)
			const inventoryData = await pool.query(query)
			console.log('inventory query ran!!!')
			console.log(inventoryData)
			console.log('Inventory Query Complete!!!')
			  res.json(inventoryData)
			});
})
// *** end GET Inventory end ***

// Export module
module.exports = router
