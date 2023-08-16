<?php

/**
 * Renvoie la valeur de mise sur le marché de la crypto monnaie
 * @param $cryptoname {string} Le nom de la crypto monnaie
 */
function getFirstCotation($cryptoname){
  return ord(substr($cryptoname,0,1)) + rand(0, 10);
}

/**
 * Renvoie la variation de cotation de la crypto monnaie sur un jour
 * @param $cryptoname {string} Le nom de la crypto monnaie
 */
function getCotationFor($cryptoname){	
	return ((rand(0, 99)>40) ? 1 : -1) * ((rand(0, 99)>49) ? ord(substr($cryptoname,0,1)) : ord(substr($cryptoname,-1))) * (rand(1,10) * .01);
}