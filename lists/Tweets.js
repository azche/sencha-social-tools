/**** taken from the twitter touch example ***/

Ext.define('TT.view.Tweets', {
    extend: 'Ext.List',
    xtype: 'tweets',

    config: {

		searchBy: '#sencha', //enter yours or change it dynamically
        title: 'Tweets',
        iconCls: 'chat',
        cls: 'tweets',

		listeners: {
			activate: function(t, o) {
				if (!this.searchBy) alert('provide a valid searchBy string (line 10)');
				if (!this.loadedTweets) {
					this.getStore().getProxy().setExtraParams({q: this.searchBy});
					this.getStore().load();

					this.loadedTweets = true;
				}
			}
		},

        store: {
			fields: ['from_user', 'profile_image_url', 'text', 'created_at'],

			pageSize: 10,

			proxy: {
			    type: 'jsonp',
			    url: 'http://search.twitter.com/search.json',

			    pageParam: 'page',
			    limitParam: 'rpp',

			    reader: {
			        type: 'json',
			        rootProperty: 'results'
			    }
			}
		},

        limit: 10,
        disableSelection: true,

        plugins: [
            { type: 'listpaging' },
            { type: 'pullrefresh' }
        ],

        emptyText: '<p class="no-searches">No tweets found</p>',

        itemTpl: Ext.create('Ext.XTemplate',
            '<img src="{profile_image_url}" />',
            '<div class="tweet">',
                '<span class="posted">{[this.posted(values.created_at)]} by {from_user}</span>',
                '<p>{text}</p>',
            '</div>',
            {
                posted: function(date) {
                    try {
                        var now = Math.ceil(Number(new Date()) / 1000),
                            dateTime = Math.ceil(Number(new Date(date)) / 1000),
                            diff = now - dateTime,
                            str;

                        if (diff < 60) {
                            return String(diff) + ' seconds ago';
                        } else if (diff < 3600) {
                            str = String(Math.ceil(diff / (60)));
                            return str + (str == "1" ? ' minute' : ' minutes') + ' ago';
                        } else if (diff < 86400) {
                            str = String(Math.ceil(diff / (3600)));
                            return str + (str == "1" ? ' hour' : ' hours') + ' ago';
                        } else if (diff < 60 * 60 * 24 * 365) {
                            str = String(Math.ceil(diff / (60 * 60 * 24)));
                            return str + (str == "1" ? ' day' : ' days') + ' ago';
                        } else {
                            return Ext.Date.format(new Date(date), 'jS M \'y');
                        }
                    } catch (e) {
                        return '';
                    }
                }
            }
        )
    }
});
