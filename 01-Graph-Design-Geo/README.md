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
| 1 | <ul><li>How do the countries compare in terms of how much they receive and donate from other countries?</li><li>Are there countries that donate much more than they receive or receive much more than they donate?</li></ul> | *Coming Soon* |
| 2 | <ul><li>Do the countries that receive or donate the most tend to cluster around specific geographical areas of the world?</li><li>Are there neighboring countries that have radically different patterns in terms of how much they receive vs. how much they donate</li></ul> | *Coming Soon* |

# Running Code
Code derived from [NYU Info Vis](https://github.com/nyuvis/info-vis-project-template) template.

To view `d3` visualizations, a local server must be created. This can be done by navigating to this directory and running:
```python
# For Python 3:
python -m http.server
```
The website will be viewable at [http://localhost:8000/](http://localhost:8000/).
