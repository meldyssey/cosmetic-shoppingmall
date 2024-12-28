const express = require("express");
const router = express.Router();
const con = require("../db");


module.exports = () => {
    router.get('/:id', async (req,res)=>{
  
      console.log("payment2 view_prod 접근")
  
      try {
        const [ret] = await con.execute('select bs_id, bs_product_id, product_upSystem, product_name_kor, product_name_eng, product_volume, product_price from view_product_info_opt join basket on basket.bs_product_id = view_product_info_opt.product_opt_id where bs_email = ?', [req.params.id])
  
        res.json(ret)
      } catch(err){
        console.log('sql 실패 : ', err.message)
        res.status(500).send('db 오류')
      }
    })

    // 결제정보입력
    router.post('/join/:id', async (req,res)=>{

      const [ret] = await con.execute('SELECT MAX(order_id) AS max_order_id FROM orders')

      const maxOrderId = ret[0].max_order_id+1

      console.log(maxOrderId)
       
      try {
        // 기본 주문 insert
        let sql = `INSERT INTO orders (order_id, email, pay_to, order_name, order_total, order_tel, order_zip, order_roadname, order_buildname, order_addredetail, order_msg, order_status, order_date, invoice) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, SYSDATE(), null)`
        let data = [
          maxOrderId,
          req.body.email,
          req.body.pay_to,
          req.body.order_to,
          req.body.order_total,
          req.body.order_tel,
          req.body.zip,
          req.body.roadname_address,
          req.body.building_name,
          req.body.detail_address,
          req.body.order_msg,
          req.body.status
        ]   
        // console.log(data)
        await con.execute(sql, data)

        // detail insert
        let sql2 = `INSERT INTO orders_detail (order_id, product_id, order_cnt, product_price) VALUES (?, ?, ?, ?)`
        
        for(let prod of req.body.products){
          let data2 = [
            maxOrderId,
            prod.product_id,
            prod.order_cnt,
            prod.product_price
          ]
          // console.log(data2)
          await con.execute(sql2, data2)
        }

        res.json(maxOrderId)
      } catch(err){
          console.log('sql 실패 : ', err.message)
          res.status(500).send('db 오류')
      }

  })

  // 결제되면 장바구니 삭제
  router.delete('/delete/:id', async (req,res)=>{
  
    console.log("payment2 basket delete")

    try {
      await con.execute('DELETE FROM basket WHERE bs_email = ?', [req.params.id]);
    } catch(err){
      console.log('sql 실패 : ', err.message)
      res.status(500).send('db 오류')
    }
  })
  
    return router;
  };