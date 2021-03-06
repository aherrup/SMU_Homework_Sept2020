import os
import csv
import operator
import statistics


csvpath ="PyBank\\Resources\\budget_data.csv"

with open(csvpath) as csvfile:
    csvreader = csv.reader(csvfile, delimiter=',')
    csv_header = next(csvreader)
    # print(f"CSV Header: {csv_header}")

    totalMonths= 0
    totalPL=0
    prevRev=0
    plChangeDic={}
    isFirstRow = True

    for row in csvreader:
        totalMonths+=1
        totalPL+=int(row[1])
        #used Booth code to figure out how to get data to skip first row in average rather then just take that month's revenue and subtract 0
        if isFirstRow:
            prevRev = int(row[1])
            isFirstRow = False
        else:
            revChange=int(row[1])-prevRev
            prevRev=int(row[1])
            plChangeDic[row[0]]=revChange
    
    averageChange = statistics.mean(plChangeDic.values()) 
    largestChangeMth = max(plChangeDic,key=plChangeDic.get)
    largestChange=plChangeDic[largestChangeMth]
    smallestChangeMth = min(plChangeDic,key=plChangeDic.get)
    smallestChange=plChangeDic[smallestChangeMth]

    summaryString=f"""    Financial Analysis
    ---------------------------------------
    Total Months: {totalMonths}
    Total Revenue: {totalPL}
    Largest Increase in Profits: {largestChange} in {largestChangeMth}
    Largest Decrease in Profits: {smallestChange} in {smallestChangeMth}"""

    # print(summaryString)
with open("bank_results.txt", "w") as file1:
    file1.write(summaryString)

# averageChange=round(totalPL/totalMonths,2)
# print(averageChange)