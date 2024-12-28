import React from 'react';
import styles from '../../../scss/service/review/Modal.module.scss';

const Modal = ({ children, onClose }) => {
    return (
         // 모달 전체를 덮는 Overlay 영역
        <div className={styles.modalOverlay} onClick={onClose}>
            {/* 모달 콘텐츠 영역 */}
            <div className={styles.modalContent} 
            onClick={(e) => e.stopPropagation()}>
                {children}  {/* 전달된 자식 요소를 렌더링 */}
                 {/* 버튼 그룹을 배치할 영역 (추가 버튼 등을 위해 사용 가능) */}
                <div className={styles.buttonGroup}></div>
            </div>
        </div>
    );
};

export default Modal;
