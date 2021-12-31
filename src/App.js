import React, { useState, useEffect } from 'react'
import alanBtn from '@alan-ai/alan-sdk-web'
import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles.js';
import wordsToNumbers from 'words-to-numbers';

const alanKey = '5635f5450ac9a7830ec03426b360f75f2e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () => {
    const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle] = useState(-1);
    const classes = useStyles();


    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({ command, articles, number }) => {
                if( command === 'newHeadlines' ){
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                }
                else if( command === 'highlight' ){
                    setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
                }
                else if( command === 'open' ){
                    const parsedNumber = number.length > 2 ? wordsToNumbers(number, {fuzzy: true}) : number; 
                    const article = articles[parsedNumber - 1];
                    if(parsedNumber > 20 ){
                        alanBtn().playText('Please try that again.');
                    } else{
                        alanBtn().playText('opening');
                        window.open(article.url, '_blank');
                    }          
                    
                }
            },

        })
    }, []);
    return (
        <>
            <div className={classes.logoContainer} >
                <img src="https://alan.app/brand_assets/seal/color/alan-seal-horizontal-color.png" className={classes.alanLogo} alt='alan logo' />
            </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle}/> 
            <span className={classes.footerCopy} >All rights reserved, Amine Elkhalidy .2021</span>
        </>
    )
}

export default App
