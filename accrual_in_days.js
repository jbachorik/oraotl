// ==UserScript==
// @name       OTL Accrual Balance in Days
// @namespace  https://github.com/jbachorik/oraotl
// @version    0.3
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
        "//span[@title='Accrual Balance']",
        "//span[@title='Time-off Taken']",
        "//span[@title='Carry Over']",
        "//span[@title='Current Accrual']",
        "//span[@title='Time Entitlement']",
        "//span[@title='Time Adjustment']"
    ].join('|')
        
    var found = document.evaluate( xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE , null );
    
    for ( var i=0 ; i < found.snapshotLength; i++ ) {
      var hrs = found.snapshotItem(i).innerText
      var days =  hrs / 8
      found.snapshotItem(i).innerText =  days
    }
}

calcAccrualDaysOverview()
calcAccrualDaysDetail()
