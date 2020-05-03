# Assignment
In this assignment, you have to design visualization solutions for questions related to the
AidData dataset. This dataset contains information about financial transactions for aid purposes
between two countries. Given the data structure and analytical questions presented below, your
goal is to sketch views that would help an analyst to obtain the answer for those questions.

## Data
In the AidData dataset, each row represents a financial transaction between two countries. The dataset contains the following attributes:

| Attribute | Description |
| - | - |
| Year | Year of the commitment | 
| Donor | Country providing the financial resource | 
| Recipient | Country or organization receiving the money | 
| Commitment Amount | The total amount of financial resources provided | 
| Coalesced Purpose Name | The purpose of the transaction | 

## Goal
To create 3 independent visualizations of the same data set, each one with the intent of answering the questions stated below. For each numbered visualization, you should be able to create a data visualization that answers all of the questions specified.

# Visualizations
| # | Questions | Visualizations |
| - | - | - |
| 1 | <ul><li>How does the amount donated vs. amount received change over time across all countries?</li><li>Are there countries that mostly send or mostly receive and countries that have a similar amount of donations they receive and send?</li><li>Are there countries that change their role over time? That is, they used to mostly send donations and turn into mostly receiving donations and vice-versa?</li><li>Are there countries in which you can find a sudden increase ("peak") or a sudden decrease ("valley")?</li></ul> | *Coming Soon* |
| 2 | Focus on the top 10 “Coalesced Purposes” of donations (in terms of amount of disbursement across all countries and all time). What are the top 10 purposes of disbursements (in terms of total amount of disbursement) and how does their relative amount compare over time? E.g., are there purposes that tend to be prominent for a period of time and others that become more prominent during other periods? <br/><br/>*Hint: looking at the graph one should be able to observe: “Ah! During these years donations were mostly about X but then there were way more donations about Y”.* | *Coming Soon* |

# Running Code
Code derived from [NYU Info Vis](https://github.com/nyuvis/info-vis-project-template) template.

To view `d3` visualizations, a local server must be created. This can be done by navigating to this directory and running:
```python
# For Python 3:
python -m http.server
```
The website will be viewable at [http://localhost:8000/](http://localhost:8000/).
