/** facebook fan page list ***/

Ext.define('TT.view.Facebook', {
    extend: 'Ext.List',
    xtype: 'facebook',

    config: {

		facebookPageID: 0,//ENTER YOURS:
		//http://ooiks.com/blog/how-to-2/get-facebook-fans-page-news-feed-rss-feed-atom-feed
		//http://bewelldogood.wordpress.com/2011/08/14/how-to-find-a-facebook-id-if-a-shortened-url-has-been-assigned/

        title: 'Facebook',
        iconCls: 'chat',
        cls: 'facebook',

		listeners: {
			activate: function(t, o) {
				if (!this.facebookPageID) alert('provide a valid facebookPageID (line 9)');
				if (!this.loadedFacebook) {
					try {
						this.getStore().getProxy().setExtraParams({
							id: this.facebookPageID,
							format: 'json'
						});
						this.getStore().load();
						this.loadedFacebook = true;
					} catch(e) { console.log(e) }
				}
			},

			itemtap: function(list, index, node, event) {
				try {
					var record = this.getStore().getAt( index );
					var url = record.get('alternate');
					link = document.createElement('a');
					link.setAttribute('href', url);
					link.setAttribute('target','_blank');
					clickevent = document.createEvent('Event');
					clickevent.initEvent('click', true, false);
					link.dispatchEvent(clickevent);
				} catch(e) { console.log(e) }
			}
		},

        store: {
			fields: ['title', 'content', 'published', 'author', 'alternate'],
			pageSize: 10,

			proxy: {
			    type: 'ajax',
			    url: 'http://www.facebook.com/feeds/page.php',

			    reader: {
			        type: 'json',
			        rootProperty: 'entries'
			    }
			}
		},

        disableSelection: true,

        plugins: [{ type: 'pullrefresh' }],

        emptyText: '<p class="no-feeds">No facebook posts found</p>',

		/**** template taken from the twitter touch example! ***/
        itemTpl: Ext.create('Ext.XTemplate',
            '<div class="fbpost">',
                '<span>{[this.posted(values.published)]}</span>',
                '<h1>{title}</h1>',
                //'<span>{author.name}</span>',
                //'<p>{content}</p>',
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
