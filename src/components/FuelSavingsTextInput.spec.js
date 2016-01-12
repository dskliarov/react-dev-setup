import chai from 'chai';
import cheerio from 'cheerio';
import FuelSavingsTextInput from './FuelSavingsTextInput';
import React from 'react';
import ReactDOMServer from 'react/lib/ReactDOMServer';

chai.should();

/*This test file displays how to test a React component's HTML
  outside of the browser. It uses Cheerio, which is a handy
  server-side library that mimics jQuery. So to test a React
  components HTML for a given state we do the following:
  1. Instantiate the component and pass the desired prop values
  2. Use ReactDOMServer to generate the resulting HTML
  3. Use Cheerio to load the HTML into a fake DOM
  4. Use Cheerio to query the DOM using jQuery style selectors
  5. Assert that certain DOM elements exist with expected values.
 */
describe('Fuel Savings Text Input Component', () => {
	describe('input properties', () => {
		it('displays placeholder from props', () => {
			//arrange
			var props = {
				placeholder: 'test',
				value: 'yo',
				name:'jimmy',
				onChange: ()=>{}
			};

			var sut = React.createElement(FuelSavingsTextInput, props);
			//console.log(sut);
			//act
			var html = ReactDOMServer.renderToStaticMarkup(sut);
			//console.log(html);
			let $ = cheerio.load(html);
			var fuelSavingsInputPlaceholder = $('.small').attr('placeholder');

			//assert
			fuelSavingsInputPlaceholder.should.equal(props.placeholder);
		});
	});
});
