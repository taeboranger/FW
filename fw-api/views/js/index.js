window.onload = () => {
    $.ajax({
        url: '/graphql',
        method: 'POST',
        data: {
            query: `query{
                getSheet(index: null, page: 1) {
                  index,
                  userIndex,
                  itemIndex,
                  price,
                  bonus,
                  date,
                  type
                }
              }`
        }
    }).then(res => {
        res = res.data.getSheet
        console.log(res)
        res.forEach(item => {
            item.index = 1 //remove this
            $.ajax({
                url: '/graphql',
                method: 'POST',
                data: {
                    query: `query{
                        getItem(index: ${item.index = 1}) {
                            index,
                            itemCode,
                            name,
                            price,
                            series,
                            img,
                            category,
                            bonus
                        }
                      }`
                }
            }).then(res => {
                info = res.data.getItem[0]
                var itemHtml = `<div class="sheet-item">
                                    <div class="sheet-itemindex">${item.index}</div>
                                    <div class="sheet-thumb">${info.img}</div>
                                    <div class="sheet-series">${info.series}</div>
                                    <div class="sheet-name">${info.name}</div>
                                    <div class="sheet-price">${info.price}</div>
                                    <div class="sheet-price-bought">${item.price}</div>
                                    <div class="sheet-bonus">${info.bonus}</div>
                                    <div class="sheet-bonus-exist">${item.bonus}</div>
                                    <div class="sheet-date">${item.date}</div>
                                    <div class="sheet-type">${info.category}</div>
                                </div>`
                $(itemHtml).appendTo('.sheet-list')
            })


        })

    })
}