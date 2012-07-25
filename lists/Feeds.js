/** RSS Feeds module **/
/** Converts XML to JSON via googleapis **/

Ext.define('TT.view.Feeds', {
    extend: 'Ext.List',
    xtype: 'feeds',

    config: {

		feedsURL = '',//RSS FEED URL!!

        title: 'RSS Feed',
        iconCls: 'chat',
        cls: 'feeds',

        store: {
			fields: ['title', 'link', 'contentSnippet', 'publishedDate'],
			pageSize: 20,
			proxy: {
			    type: 'jsonp',
			    url: 'http://ajax.googleapis.com/ajax/services/feed/load',
			    limitParam: 'rpp',
			    reader: {
			        type: 'json',
			        rootProperty: 'responseData.feed.entries'
			    }
			}
		},

		listeners: {
			activate: function(t, o) {
				if (!this.feedsURL) alert('provide a valid feedsURL (line 10)');
				if (!this.loadedFeeds) {
					this.getStore().getProxy().setExtraParams({
						q: this.feedsURL,
						v: '1.0'
					});
					this.getStore().load();
					this.loadedFeeds = true;
				}
			},
			itemtap: function(list, index, node, event) {
				try {
					var record = this.getStore().getAt( index );
					var url = record.get('link');
					if( url ) {
						link = document.createElement('a');
						link.setAttribute('href', url);
						link.setAttribute('target','_blank');
						clickevent = document.createEvent('Event');
						clickevent.initEvent('click', true, false);
						link.dispatchEvent(clickevent);
					}
				} catch(e) { console.log(e) }
			}
		},

        disableSelection: true,
        plugins: [{ type: 'pullrefresh' }],

        emptyText: '<p class="no-feeds">No feeds found</p>',


		/**** template taken from the twitter touch example! ***/
        itemTpl: Ext.create('Ext.XTemplate',
            '<div class="feed">',
                '<span class="posted">{[this.posted(values.publishedDate)]}</span>',
                '<p>{title}</p>',
                //'<p>{contentSnippet}</p>',
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
