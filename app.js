$(document).ready(function(){ 

  $('#generateHTML').on('click', function() {
    const auctions = $('#auctionIDs').val().split(',');
    let html = '<div>\n';
    const promises = [];
    auctions.forEach((auction, i) => {
      const queryString = 'https://www.govliquidation.com/auction/view?auctionId=' + auction;

      const request = $.get(queryString, function(data) {
        const lotNumber  = $(data).find('.event-details label:last span').text();
        const imageSrc   = 'https://www.govliquidation.com/' + $(data).find('#auction_photos img.large-thumbnail').attr('xsrc');
        const description = $(data).find('#description_container').text().replace('Description:','').trim();
        const category    = $(data).find('.breadcrumbs-bin ul li:last a').text();
        const quantity    = $(data).find('.auction-details table tr:first td:last').text().substring(0,$(data).find('.auction-details table tr:first td:last').text().indexOf('(')).trim();
        const location    = $(data).find(".auction-details table tr td h4:contains('Item Location')").parent().next().text()
        const currentBid = $(data).find('#auction_current_bid').text().trim();

        html += 
        `     <div style='display: inline-block;
                      width: 50%;
                      box-shadow: 1px 1px #666;
                      padding: 0px !important;
                      background-color: #555;
                      color:white;
                      margin: 10px;
                      border-radius: 12px;
                      font-size: 18px;'>
            <h2 style='text-align:center'>Lot Number: ${lotNumber}</h2>
            <img style='display:block; margin:auto; width:80%;'src='${imageSrc}'> </img>
            <ul>
              <li><h5>Description: ${description}</h5></li>\n
              <li><h5>Category: ${category}</h5></li>\n
              <li><h5>Quantity: ${quantity}</h5></li>\n
              <li><h5>Location: ${location}</h5></li>\n
              <li><h5>Current Bid: ${currentBid}</h5></li>\n
            </ul>\n
            <a href='${queryString}' target='_blank'><button 
                                                      style='display:block; 
                                                      margin:10px auto;
                                                      background-color:#008CBA;
                                                      text-decoration:none;
                                                      text-align:center;
                                                      border:none;
                                                      padding: 15px 32px;
                                                      '>View 
            Auction</button></a>\n  
     </div>\n` 
      });
      promises.push(request);
    })
    $.when.apply(null, promises).done(() => {
      $('#htmlField').val(html + '</div>')
      $('#auctionIDs').val('');
    })
  })
})