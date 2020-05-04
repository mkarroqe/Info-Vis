# ok
# 0 
# 1 aiddata_id
# 2 aiddata_2_id
# 3 year
# 4 donor
# 5 recipient
# 6 commitment_amount_usd_constant
# 7 coalesced_purpose_code
# 8 coalesced_purpose_name

import csv
from collections import Counter

data_root = "/Users/mkarroqe/Desktop/github/Info-Vis/Mini-Projects/02-Temporal/data/"
data_src = data_root + "vis2Data.csv"

purps = ['Social/ welfare services', 'Strengthening civil society', 'Higher education', 'Multisector aid', 'Material relief assistance and services', 'Education facilities and training', 'Administrative costs', 'Agricultural development', 'Vocational training', 'Industrial development']

with open(data_src) as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')

    for row in csv_reader:
    	for i in range(len(row)):
    		purpose = row[0]
    		if purpose not in purps:
    			

    top_10_purps = Counter(purposes)
    for key, value in top_10_purps.most_common(11):
    	if key != "Sectors not specified":
    		data.append(key)

    print(data)
    # data = [[][][][][][][][][][]]
    # for row in csv_reader:
    # 	for i in range(len(row)):
    # 		year = row[3]
    # 		amount = row[6]
    # 		purpose = row[8]

    # 		if purpose == "Power generation/renewable sources":
    # 			break
    # 		elif purpose == "Electrical transmission/ distribution"
    # 			break
    # 		elif purpose == "Rail transport"
    # 			break
    # 		elif purpose == "Water transport"
    # 			break
    # 		elif purpose == "Energy generation and supply, combinations of activities"
    # 			break
    # 		elif purpose == "Road transport"
    # 			break
    # 		elif purpose == "Gas distribution"
    # 			break
    # 		elif purpose == "Water supply and sanitation - large systems"
    # 			break
    # 		elif purpose == "Fishery development"
    # 			break
    # 		elif purpose == "Mineral/Metal prospection and exploration"
    # 			break
    		
    		

    #     if line_count == 0:
    #         print('Column names are:', row)
    #         for i in range(len(row)):
            	# print(i, row[i])       