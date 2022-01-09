express
passport
sequelize


models
------

 User
-index*
-userId*
-email*

Sheet
-index*
-userIndex
-itemIndex
-price
-bonus e/ne
-date
-type(보유, 예약, 판매)

Item
-index*
-itemCode*
-name
-number
-price
-series
-category
-bonus

ItemImg
-index*
-itemCode
-file_link
-turn


-프로필
    -보유 넨도 수
    -총 금액
    -세트 컴플리트
-시트
-세트 목록
-리뷰 등록

item(index) : 상품 정보 제공
sheet() : 시트 정보 제공

sheetReg(itemIndex, price!, bonus e/ne!, date!, type) 