import os
import csv
import operator

csvpath ="PyPoll\\Resources\\election_data.csv"

with open(csvpath) as csvfile:
    csvreader = csv.reader(csvfile, delimiter=',')
    csv_header = next(csvreader)
    # print(f"CSV Header: {csv_header}")
    
    totalVotes= 0
    candidateName=[]
    voteCountDict={}
    for row in csvreader:
        totalVotes+=1 
        selectedCandidate=row[2]
        #add candidate to list and dictionary if not already included
        if selectedCandidate not in candidateName:
            candidateName.append(selectedCandidate)
            voteCountDict[selectedCandidate] = 1
        #if already included, add their additional vote to the candidates dictionary value
        else:
            currentVotes=voteCountDict[selectedCandidate]
            voteCountDict[selectedCandidate]=(currentVotes+1)
    winPercent1=round((voteCountDict[candidateName[0]])/((voteCountDict[candidateName[0]])+(voteCountDict[candidateName[1]])+(voteCountDict[candidateName[2]])+(voteCountDict[candidateName[3]]))*100)
    winPercent2=round((voteCountDict[candidateName[1]])/((voteCountDict[candidateName[0]])+(voteCountDict[candidateName[1]])+(voteCountDict[candidateName[2]])+(voteCountDict[candidateName[3]]))*100)
    winPercent3=round((voteCountDict[candidateName[2]])/((voteCountDict[candidateName[0]])+(voteCountDict[candidateName[1]])+(voteCountDict[candidateName[2]])+(voteCountDict[candidateName[3]]))*100)
    winPercent4=round((voteCountDict[candidateName[3]])/((voteCountDict[candidateName[0]])+(voteCountDict[candidateName[1]])+(voteCountDict[candidateName[2]])+(voteCountDict[candidateName[3]]))*100)  
  
    candidateWinPercents=[winPercent1,winPercent2, winPercent3,winPercent4]
    candidateTally= list(voteCountDict.values())
    
    summaryString=f"""Election Results
    ----------------------------------
    Total votes: {totalVotes}
    ----------------------------------
    {candidateName[0]}: had {candidateWinPercents[0]}% of the votes ({candidateTally[0]})
    {candidateName[1]}: had {candidateWinPercents[1]}% of the votes ({candidateTally[1]})
    {candidateName[2]}: had {candidateWinPercents[2]}% of the votes ({candidateTally[2]})
    {candidateName[3]}: had {candidateWinPercents[3]}% of the votes ({candidateTally[3]})
    ----------------------------------
    and the winner is..........
    {max(voteCountDict.items(), key=operator.itemgetter(1))[0]} with {voteCountDict.get(max(voteCountDict, key=voteCountDict.get ))} votes!!!!!!"""



    # str1=("Election Results")
    # str2=("------------------")
    # str3=(f"Total votes:{totalVotes}")
    # str4=("------------------")
    # str5=(f"{candidateName[0]}: had {candidateWinPercents[0]}% of the votes ({candidateTally[0]})")
    # str6=(f"{candidateName[1]}: had {candidateWinPercents[1]}% of the votes ({candidateTally[1]})")
    # str7=(f"{candidateName[2]}: had {candidateWinPercents[2]}% of the votes ({candidateTally[2]})")
    # str8=(f"{candidateName[3]}: had {candidateWinPercents[3]}% of the votes ({candidateTally[3]})")
    # str9=("------------------")
    # str10=("and the winner is..........")
    # str11=(f"{max(voteCountDict.items(), key=operator.itemgetter(1))[0]} with {voteCountDict.get(max(voteCountDict, key=voteCountDict.get ))} votes!!!!!!")
    
    # print(summaryString)
with open("poll_results.txt", "w") as file1:
    file1.write(summaryString)


# counter=0
# lCounter=0
    
# canidates=["Khan","Li"]

# for votes in range(4):
#     voteChoice=input("who would you like to vote for?")
#     if voteChoice ==canidates[0]:
#         counter+=1
#     elif voteChoice ==canidates[1]:
#         lCounter+=1
# print(counter)
    
    # voteCountDict={"Khan": 0,"Correy": 0,"Li":0,"O'Tooley": 0)}

