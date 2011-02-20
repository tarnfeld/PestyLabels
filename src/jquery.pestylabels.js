/**
 *
 *
 *
 *
 */
 
(function() {

	$.pestylabels = function(el, override, options)
	{
		
		// Set the base var
		var base = this;
		
		// Set the options
		base = $.extend({},$.pestylabels.defaults, options);
		base.placeholder = override;
		
		// Empty function
		base.isEmpty = function()
		{
			return !($(el).val().length > 0);
		}
		
		// Handle focus
		base.handleFocus = function() {
			base.handleValueChanged();
		}
		
		// Handle blur
		base.handleBlur = function() {
			base.handleValueChanged();
		}
		
		// Handle valueChanged
		base.handleValueChanged = function() {
			if(!base.isEmpty())
			{
				$(base.label).fadeOut(250);
			}
			else
			{
				$(base.label).fadeIn(150);
			}
		}
		
		// Get the label text
		if(base.placeholder == undefined)
		{
			base.placeholder = $(el).attr('placeholder');
		}
		
		// Check the text
		if(base.placeholder.length > 0)
		{
			// Stop HTML5
			$(el).removeAttr('placeholder');
			
			// Get the position for the placeholder
			var top = $(el).position().top;
			var left = $(el).position().left;
			
			// Create the label element
			base.label = $('<label class="pestylabels">' + base.placeholder + '</label>');
			$(base.label).css({
				position: 'absolute',
				top: top,
				left: left,
				display: 'block',
				cursor: $(el).css('cursor')
			});
			
			// Handle events
			$(el).focus(function() {
				base.handleFocus();
			});
			$(base.label).click(function() {
				$(el).focus();
			});
			$(el).blur(function() {
				base.handleBlur();
			});
			$(el).keydown(function() {
				base.beforeLength = $(this).val().length;
			});
			$(el).keyup(function() {
				base.afterLength = $(this).val().length;
				
				if(!base.isEmpty() && base.beforeLength < base.afterLength)
				{
					base.handleValueChanged();
				}
			});
			
			// Before we attach it, check field value
			base.handleValueChanged();
			
			// Attach it
			$(el).parent().prepend(base.label);
		}
		
	}
	
	$.fn.pestylabels = function(override, options) {
		return this.each(function(){
			(new $.pestylabels(this, override, options));
		});
	}

})(jQuery);