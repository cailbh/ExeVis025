# print("py")
import sys
import geneticAlgorithm as gE
from pymongo import MongoClient
import random
client = MongoClient('mongodb://127.0.0.1:27017')
# my_col = client['ProData']['testProblem']
my_col = client['PTADATA']['problems']
my_col1 = client['ProData']['conceptGptScatter']
my_conOri = client['ProData']['conceptOri']
paperSankeyData_col = client['ProData']['paperSankeyData']
problems = my_col.find()
conGPT = my_col1.find()

conOri = list(my_conOri.find())

def main(problemList):
     
    # ids = checkedIds.split(",")
    newProblemList = []
    num = 0
    result = []
    for problem in problemList:  # problems:
        knowledgePointPaths = problem['knowledgePointPaths']
        # jg = 
        # if(jg==1):
        
        rand_num = random.random()
        if num >30:
            break
        if rand_num>0.9:
            num = num+1
            result.append(problem['id'])

    problemList = newProblemList

    print(result)


if __name__ == '__main__':
    # print([11,sys.argv[1]])
    problems = list(problems)
    # main(problems, 60, 10, [sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4]], 0.5, 0.7,sys.argv[5],sys.argv[6])
    main(problems)