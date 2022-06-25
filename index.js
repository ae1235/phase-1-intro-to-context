// Your code here
let createEmployeeRecord = function(row){
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}
let createEmployeeRecords = function(employeeRowData) {
    return employeeRowData.map(function(row){
        return createEmployeeRecord(row)
    })
}
let createTimeInEvent = function(dateStamp){
    let [date, hour] = dateStamp.toString().split(' ')
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return this
}
let createTimeOutEvent = function(dateStamp){
    let [date, hour] = dateStamp.toString().split(' ')
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return this
}
let hoursWorkedOnDate = function(soughtDate){
    let inEvent = this.timeInEvents.find(function(e){
        return e.date === soughtDate
    })
    let outEvent = this.timeOutEvents.find(function(e){
        return e.date === soughtDate
    })
    return (outEvent.hour - inEvent.hour) / 100
}
let wagesEarnedOnDate = function(dateSought){
    let rawWage = hoursWorkedOnDate.call(this, dateSought)
        * this.payPerHour
    return parseFloat(rawWage.toString())
}
let allWagesFor = function(){
    let eligibleDates = this.timeInEvents.map(function(e){
        return e.date
    })
    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0)
    return payable
}
let findEmployeeByFirstName = function(srcArray, firstName) {
  return srcArray.find(function(rec){
    return rec.firstName === firstName
  })
}
let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor.call(rec)
    }, 0)
}
const firstRecord = createEmployeeRecord(["Adam", "Lenter", "King", 25]);
const inStamp = "2021-10-12 1234";
const outStamp = "2021-10-12 1534";

const recordWithIn = createTimeInEvent(firstRecord, inStamp);
const recordWithOut = createTimeOutEvent(firstRecord, outStamp);

const inStamp2 = "2021-10-13 1234";
const outStamp2 = "2021-10-14 1834";

const recordWithIn2 = createTimeInEvent(firstRecord, inStamp2);
const recordWithOut2 = createTimeOutEvent(firstRecord, outStamp2);
console.log(allWagesFor(recordWithOut2));