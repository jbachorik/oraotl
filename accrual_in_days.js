// ==UserScript==
// @name       OTL Accrual Balance in Days
// @namespace  https://github.com/jbachorik/oraotl
// @version    0.1
// @description  Compute OTL Accrual Balance in Days
// @match      https://global-ebusiness.oraclecorp.com/*
// @copyright  2012+, You
// ==/UserScript==

function calcAccrualDaysOverview() {
  var xpath = "//span[@id='VacBalance']"
  var found = document.evaluate( xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE , null );
  var rexp = /([0-9]*[.][0-9]+)/g;
                    
  for ( var i=0 ; i < found.snapshotLength; i++ ) {
    var hrs = found.snapshotItem(i).innerText.match(rexp)
    var txt = found.snapshotItem(i).innerText
    found.snapshotItem(i).innerText =  txt.replace("In Hours", "In Days").replace(hrs, hrs / 8)
  }
}

function calcAccrualDaysDetail() {
  var xpath = [
    "//td[@class='x1n x50']/span",
    "//td[@class='x1y x4m']/span"
  ].join("|")
                       
  var found = document.evaluate( xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE , null );
             
  for ( var i=0 ; i < found.snapshotLength; i++ ) {
    var hrs = found.snapshotItem(i).innerText
    var days =  hrs / 8
    found.snapshotItem(i).innerText =  days
  }
}

calcAccrualDaysOverview()
calcAccrualDaysDetail()
