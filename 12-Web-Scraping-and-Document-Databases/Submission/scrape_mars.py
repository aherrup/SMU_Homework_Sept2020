from splinter import Browser
from bs4 import BeautifulSoup as bs
from webdriver_manager.chrome import ChromeDriverManager
import pandas as pd
import datetime
import time
import requests
from selenium import webdriver

class ScrapeMars():
    def __init__(self):
        pass

    def init_browser(self):
        # @NOTE: Replace the path with your actual path to the chromedriver
        executable_path = {'executable_path':"/Users/abby/.wdm/drivers/chromedriver/win32/87.0.4280.88/chromedriver.exe"}
        browser = Browser('chrome', **executable_path, headless=True)
        return browser


    def scrape_info(self):
        browser = self.init_browser()

        # Visit visitcostarica.herokuapp.com
        news_url = 'https://mars.nasa.gov/news/'
        browser.visit(news_url)
        news_html = browser.html

        time.sleep(1)

        # Scrape page into Soup
        
        soup = bs(news_html, "lxml")

        #mars news
        news_title_scrape=soup.find_all(class_="content_title")[1].text
        news_par_scrape=soup.find_all('div',class_="article_teaser_body")[1].text

        #feature image
        featureimage_url = 'https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars'
        browser.visit(featureimage_url)
        featureimage_html = browser.html

        img_soup= bs(featureimage_html, "lxml")
        url="https://www.jpl.nasa.gov/"
        feature_image_scrape = img_soup.find_all(class_="button fancybox")
        feature_image_scrape = [url + x["data-fancybox-href"] for x in feature_image_scrape]

        #mars fact table
        facts_url = 'https://space-facts.com/mars/'
        mars_facts = pd.read_html(facts_url)[0]
        mars_facts.columns=["Description", "Value"]
        mars_facts_html = mars_facts.to_html(header = True, index = False)
        

        #mars hemisphere images
        hem_url = 'https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars'
        browser.visit(hem_url)
        hem_html = browser.html
        more_soup = bs(hem_html, "lxml")
      

        baseurl="https://astrogeology.usgs.gov"
        mar_hem_dictionary_list=[]
        for x in range(0,4):
            img =more_soup.find_all(class_= "thumb")
            img_url = [baseurl + y["src"] for y in img]
            title = more_soup.find_all("h3")
            title=[z.text for z in title]
            mar_hem_dictionary_list.append({"title":title[x],"img_url":img_url[x]})
            
        # Store data in a dictionary
        mars_data = {
            "news_title": news_title_scrape,
            "news_paragraph": news_par_scrape,
            "feature_image": feature_image_scrape,
            "mars_facts_table": mars_facts_html,
            "mars_hemisphere": mar_hem_dictionary_list,
        }

        # Quite the browser after scraping
        browser.quit()

        # Return results
        return mars_data
