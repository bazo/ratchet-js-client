function client()
{
	var self = this;

	this.onOpen = function(){};

	this.onClose = function(){};
	this.onError = function(){};

	this.connect = function(url)
	{
		this.connection = new WebSocket(url);
		this.connection.onopen = this.onOpen;
		this.connection.onclose = this.onClose;
		this.connection.onerror = this.onError;
		this.connection.onmessage = function(payload) 
		{
			var data = payload.data;
			if(data.cmd)
			{
				data = JSON.parse(payload.data);
				var cmd = data.cmd;
				var func = 'on' + cmd.charAt(0).toUpperCase() + cmd.slice(1).toLowerCase();
				self[func](data.data);
			}
			else
			{
				var msg = payload.data;
				self.onMessage(msg);
			}
		};
	}

	this.send = function(msg)
	{
		this.connection.send(msg);
	}

	this.close = function()
	{
		this.connection.close();
	}

	this.onMessage = function(msg){};
}