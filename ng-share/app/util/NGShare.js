/******
	NG.Share:
		Share By Facebook
		Share By Twitter
		Share By EMail


	HOW TO USE IT ?

		var NGShare = Ext.create('NG.Share');
		var data = {
			//required params
			title: 'Title to share!',
			url: 'http:www.linuxusers.com.ar',
			//optional params
			text: 'Lorem ipsum text to share. Escape this text',
			twitter: '@myTwitter',
			signature: 'Shared via NGShare!'
		};
		NGShare.setData( data );
		Ext.Viewport.add( NGShare );

		----------------

		EXt.Loader Include Example	
			Ext.Loader.setConfig({
				paths   : {
					'NG.Share': './app/util/NGShare.js',
				}
			});

		----------------

		Add it to app.json js array:
		js: [
	        {"path": "app/util/NGShare.js"},
			.....
		],

		----------------

	STYLING

		* Copy resources dir to your application resource dir [images & css]
		* Add it to app.json css & resources array:
		* Personalize the CSS Classes:
			.NGShare-PANEL
			.NGShare-BTN-FB
			.NGShare-BTN-TWITTER
			.NGShare-BTN-EMAIL
			.NGShare-BTN-CANCEL

		----------------

		contact me ? ng@linuxusers.com.ar
*/

Ext.define('NG.Share', {
	extend : 'Ext.Panel',
	xtype : 'ngshare',

	config: {
		cls: 'NGShare-Panel',
		fullscreen:false,
		centered: true,
		layout:'vbox',
		modal: true,
		padding: 0,
		items:[
			{
				xtype: 'button',
				text: 'Share By Facebook',
				cls: 'NGShare-BTN-FB',
				margin: 2,
				handler: function() {
					var record = this.getParent().getData();
					var link = record.url;
					var url = 'http://m.facebook.com/sharer.php?s=100&u='+ link;
					try { window.plugins.childBrowser.openExternal(url); }
					catch(e) {
						//console.log(e);
						link = document.createElement('a');
						link.setAttribute('href', url);
						link.setAttribute('target','_blank');
						clickevent = document.createEvent('Event');
						clickevent.initEvent('click', true, false);
						link.dispatchEvent(clickevent);
					}
					this.getParent().destroy();
				}
			},

			{
				xtype: 'button',
				text: 'Share By Twitter',
				cls: 'NGShare-BTN-TWITTER',
				margin: 2,
				handler: function() {
					var record = this.getParent().getData();
					var link = record.url;
					var title = record.title.replace(/&rsquo;/ig, "'");
					var user = (record.twitter) ? record.twitter : '';
					var twitter_text = title + '... ' + user + ' ' + link;
					var url = 'https://mobile.twitter.com/?status='+ twitter_text;
					try { window.plugins.childBrowser.openExternal(url); }
					catch(e) {
						link = document.createElement('a');
						link.setAttribute('href', url);
						link.setAttribute('target','_blank');
						clickevent = document.createEvent('Event');
						clickevent.initEvent('click', true, false);
						link.dispatchEvent(clickevent);
					}
					this.getParent().destroy();
				}
			},

			{
				xtype: 'button',
				text: 'Share By EMail',
				cls: 'NGShare-BTN-EMAIL',
				margin: 2,
				handler: function() {
					var record = this.getParent().getData();
					var link = record.url;
					var title = record.title;
					var text = (record.text) ? record.text : '';
					var sign = (record.signature) ? record.signature : '';
					content = title + "%0D%0A%0A" + text + "%0D%0A%0A" + link;
					emailBody =  content + "%0D%0A%0A" + sign;
					url = 'mailto:?subject=' + title + '&body=' + emailBody;
					try{
						link = document.createElement('a');
						link.setAttribute('href', url);
						clickevent = document.createEvent('Event');
						clickevent.initEvent('click', true, false);
						link.dispatchEvent(clickevent);
					} catch(e) { }
					this.getParent().destroy();
				}
			},

			{
				xtype: 'button',
				text: 'Cancel',
				cls: 'NGShare-BTN-CANCEL',
				margin: 2,
				handler: function() {
					this.getParent().destroy();
				}
			}
		]
	}
});
