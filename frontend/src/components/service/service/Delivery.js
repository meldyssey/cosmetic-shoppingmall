import React from 'react';
import styles from '../../../scss/service/Accordion.module.scss';

const Delivery = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>배송 정보</div>
      <div className={styles.bold}>**홀리이 시즌으로 인한 배송 지연 안내**</div>
      <p className={styles.marginbottom}>현재 홀리데이 시즌으로 인한 주문량 급증에 따라 배송이 평소보다 지연되고 있습니다.
        <br />고객님들의 너른 양해를 부탁드리며, 최대한 신속히 출고될 수 있도록 노력하겠습니다.</p>
      <p className={styles.p}>배송 현황은 마이페이지 '주문 내역'에서 확인 가능하며,</p>
      추가 문의 사항은 라이브챗(평일 오전 9시 ~ 17시 30분 / 점심시간 12시-13시 제외)을 이용해주시기 바랍니다.
      <br /><br />감사합니다.
    </div>
  )
}

export default Delivery;
