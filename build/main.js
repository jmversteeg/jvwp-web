'use strict';

(function ($) {

    var MediaUploader = function ($element, attachment, data) {

        this.data = data;
        this.attachment = attachment;

        this.$element = $element;
        this.$reprElement = $('[data-field-id="' + $element.attr('id') + '"]');

        this.$thumbnail = this.$reprElement.find('.thumbnail');
        this.$filename = this.$reprElement.find('.filename');
        this.$remove = this.$reprElement.find('.remove');
        this.$reprElement.click(this.upload.bind(this));
        this.$remove.click(this.remove.bind(this));

        this.invalidate();
    };

    /**
     * Creates a wp media uploader
     * @returns {wp.media}
     */
    MediaUploader.prototype.createUploader = function () {

        var uploader = wp.media({
            title:    this.data.title,
            button:   {
                text: this.data.buttonText
            },
            library:  {
                type: this.data.libraryType
            },
            multiple: this.data.multiple
        });
        var state = uploader.state();
        return uploader;

    };

    MediaUploader.prototype.select = function () {

        this.attachment = this.custom_uploader.state().get('selection').first().toJSON();
        this.invalidate();

    };

    MediaUploader.prototype.escape = function () {
    };

    MediaUploader.prototype.reset = function () {
    };

    MediaUploader.prototype.remove = function (e) {
        this.attachment = null;
        this.invalidate();
        e.preventDefault();
        return false;
    };

    /**
     * Invoked when the upload button is pressed
     * @param e
     */
    MediaUploader.prototype.upload = function (e) {

        if ($(e.target).is('a.filename'))
            return;
        e.preventDefault();
        if (!this.attachment || !this.attachment.url) {
            this.custom_uploader = this.createUploader();
            this.custom_uploader.once('select', this.select.bind(this));
            this.custom_uploader.once('escape', this.escape.bind(this));
            this.custom_uploader.once('reset', this.reset.bind(this));
            this.custom_uploader.open();
        }

    };

    MediaUploader.prototype.invalidate = function () {

        var attachmentUrl = this.attachment ? this.attachment.url : '';
        var attachmentId = this.attachment ? this.attachment.id : null;
        if (attachmentUrl) {
            this.$reprElement.addClass('set');
            this.$thumbnail.removeClass('not-set');
            this.$remove.show();

            // Set background image (in case of image preview)
            if (this.$thumbnail.is('.image-thumbnail'))
                this.$thumbnail.css('background-image', 'url(\'' + attachmentUrl + '\')');

            // Set extension data attribute
            this.$thumbnail.attr('data-file-extension', attachmentUrl.split('.').pop());

            // Set filename label
            if (this.$filename)
                this.$filename.text(attachmentUrl.split(/[\\/]/).pop()).attr('href', attachmentUrl);
        } else {
            this.$reprElement.removeClass('set');
            this.$thumbnail.addClass('not-set').css('background-image', 'none');
            this.$remove.hide();
            this.$filename.empty();
        }

        this.$element.val(attachmentId);
    };

    if (Object.prototype.hasOwnProperty.call(window, 'Fieldwork')) {
        var Fieldwork = window.Fieldwork;
        Fieldwork.ee.on('fieldAdded', function (field) {
            var fieldData = field.getFieldData();
            var mediaUploaderProps = fieldData.mediaUploaderProps;
            if (mediaUploaderProps) {
                var attachment = fieldData.attachment;
                new MediaUploader(field.getElement(), attachment, mediaUploaderProps);
            }
        });
    } else if (console) {
        console.warn('global Fieldwork was not defined; could not link JVWP wp-media-uploader component');
    }

})(jQuery);