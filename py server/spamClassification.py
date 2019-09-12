import pandas as pd
from nltk.tokenize import word_tokenize, sent_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer, PorterStemmer
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

dataset = pd.read_csv("spam.csv", encoding = "ISO-8859-1")
dataset.columns = ["class", "message", "A", "B", "C"]
dataset = dataset.drop(columns=['A','B', 'C'])

def textProcessing(df):
    tokens = []
    for i in range(len(df)):
        tokens.append(word_tokenize(df["message"][i]))
        
    stopwordsList = stopwords.words("english")
    stopwordsList.extend([",",".","/","'","\"","\\","?","<",">",";",":","[","]","|","{","}","=","+","-","_",")","(","*","&","^","%","$","#","@","!","`","~"])
    
    wordsList = []
    for tokenList in tokens:
        words = []
        for word in tokenList:
            if word.lower() not in stopwordsList:
                words.append(word.lower())
        wordsList.append(words)
        
    wnet = WordNetLemmatizer()
    for i in range(len(wordsList)):
        for j in range(len(wordsList[i])):
            wordsList[i][j] = wnet.lemmatize(wordsList[i][j], pos="v")
    
    for i in range(len(wordsList)):
        wordsList[i] = " ".join(wordsList[i])
        
    return wordsList


wordsList = textProcessing(dataset)
cv = CountVectorizer()
vect = cv.fit_transform(wordsList)
vect = vect.toarray()
y = dataset["class"]
encoder = LabelEncoder()
y = encoder.fit_transform(y)
x_train, x_test, y_train, y_test = train_test_split(vect, y, test_size=0.1)

reg = LogisticRegression()
reg.fit(x_train,y_train)

def test(rev):
    review = {'message': [rev]}
    df = pd.DataFrame(review) 
    wordsList = textProcessing(df)
    vect = cv.transform(wordsList)
    prediction = reg.predict(vect)
    if prediction[0] == 0:
        return 0
    else:
        return 1