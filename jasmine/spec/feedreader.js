/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /*
         * Tests to make sure that the allFeeds variable has been defined and that it is not
         * empty. 
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /*
         * Loops though all objects in allFeeds array and ensures it has a URL defined
         * and that the URL is not empty.
         */
         function checkForValidURL(url){
            it('Should contain a valid URL', function () {
                expect(url).toBeDefined();
                expect(url).not.toBeNull();
            })
         };

         for (var i = 0; i < allFeeds.length; i++){
            checkForValidURL(allFeeds[i].url);
         };

        /*
         * Loops though all objects in allFeeds array and ensures it has a name defined
         * and that the name is not empty.
         */
        function checkForValidName(name){
            it('Should contain a valid Name', function () {
                expect(name).toBeDefined();
                expect(name).not.toBeNull();
            })
         };

         for (var i = 0; i < allFeeds.length; i++){
            checkForValidName(allFeeds[i].name);
         };
    });

    /*
     * This test suite relates to the menu option of the application
     */
    describe('The menu', function(){
        var body = document.body,
            className = className;

        /*
         * Test to ensure the menu element is hidden by default. You'll have to analyze the HTML and
         */
        it('Menu hidden by default', function(){
            expect(body.className).toBe('menu-hidden');
        });

         /*
          * Tests to ensure the menu changes visibility when the menu icon is clicked.
          */
        describe('when menu item is clicked', function(){

            it('opens menu when clicked', function(){
                $('a.menu-icon-link').trigger('click');
                expect(body.className).not.toBe('menu-hidden');
            })

            it('closes menu when clicked again', function(){
                $('a.menu-icon-link').trigger('click');
                expect(body.className).toBe('menu-hidden');
            });

        });

    });

    /*
     * This test suite relates to the default view of the application on open
     */
    describe('Initial Entries', function(){

        beforeEach(function(done){
            loadFeed(0, function(){
                done();
            });
        });

        /*
         * Test that ensures when the loadFeed function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        it('should have at least single entry element within the feed container', function(){
            expect($('.feed').find('.entry')).not.toBeNull();
        });

    });
    /*
     * This test suite relates to when a new feed is loaded in the application
     */
    describe('New Feed Selection', function(){
        var oldFeed;

        beforeEach(function(done){
            oldFeed = $('.feed').html();
            loadFeed(0, function(){
                done();
            });
        });

        /*
         * Test to ensures when a new feed is loaded by the loadFeed function that the content actually changes.
         * that the content actually changes.
         */
        it('content should change when new feed is loaded', function(){
            loadFeed(1);
            expect($('.feed').html()).not.toMatch(oldFeed);
        });
    });

    /* 
     * This test suite relates to adding a new feed to the allFeeds array by user
     * (for future implementation, addNewFeed function has not been built)
     */
    describe('Add new feed', function(){
        var originalFeedLength = allFeeds.length;

        /*
         * Test to ensure the allFeeds array actually increases when addNewFeed function is run
         * and ensures the name and url is defined and not empty
         */
        it('should add a new object to allFeeds array', function(){
            addNewFeed('fake name', 'fake url');
            expect(allFeeds.length).toBeGreaterThan(originalFeedLength);

            var newFeed = allFeeds.pop();

            expect(newFeed.name).toBeDefined();
            expect(newFeed.name).not.toBeNull();
            expect(newFeed.url).toBeDefined();
            expect(newFeed.url).not.toBeNull();
        });
    });

}());
