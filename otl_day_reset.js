// ==UserScript==
// @name       OTL Day Column Reset
// @namespace  https://github.com/jbachorik/oraotl
// @version    0.2
// @description  Enables clearing the day column in OTL default installation; useful for editing data from template eg. recording a day-off
// @match      https://global-ebusiness.oraclecorp.com/*
// @copyright  2012+, You
// ==/UserScript==

String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, "");
};

function decorate() {
  var lblXpath = "//*[@id='Hxctimecard']/table[1]/tbody/tr/td/table[2]/tbody/tr[5]/td/table/tbody/tr[3]/td/table[1]/tbody/tr[1]/td/table/tbody/tr/td[3]/span"
    
  var found = document.evaluate( lblXpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE , null );

  var col = 0;
  for ( var i=0 ; i < found.snapshotLength; i++ ) {
      var elem = found.snapshotItem(i)

      if (elem.getAttribute('align') == undefined) {
          var content = elem.innerText
          if (content.trim() != "Timecard Type" && content.trim() != "Total") {
              console.log("c" + col + " : " + content)
              var btn = document.createElement("button")
              btn.setAttribute("type", "button")
              btn.setAttribute("id", "resetCol" + (col++))
              btn.addEventListener("click", resetColumn)
              btn.innerText = "X"
              
              found.snapshotItem(i).appendChild(btn)
          }
      }
  }
}

function resetColumn(evt) {
    var id = evt.srcElement.getAttribute("id")
    
    var rowXpath = "//*[@id='Hxctimecard']/table[1]/tbody/tr/td/table[2]/tbody/tr[5]/td/table/tbody/tr[3]/td/table[1]/tbody/tr"

    var cellXpath = [
      ".//input[@class='x8']",
      ".//input[@class='x1u']"
    ].join("|")
        
    var rows = document.evaluate( rowXpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE , null )
    
    for(var i=0;i<rows.snapshotLength;i++) {
//        console.log(rows.snapshotItem(i))
        var cols = document.evaluate( colXpath, rows.snapshotItem(i), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null )
        for(var j=0;j<cols.snapshotLength;j++) {
//            console.log(cols.snapshotItem(j))
            if (id == ("resetCol" + j)) {
                var cells = document.evaluate( cellXpath, cols.snapshotItem(j), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null )
                for(var k=0;k<cells.snapshotLength;k++) {
                    cells.snapshotItem(k).value = ""
                }
             }
        }

    }
}

decorate()
