const { registerBlockType } = wp.blocks;
const { useBlockProps, MediaUpload, MediaUploadCheck, PlainText, RichText } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import './index.scss';
import './style.scss';
 
registerBlockType( 'pss-blocks/media-uploader', {
  apiVersion: 2,
  title: 'Media Uploading Block with ESNext',
  icon: 'images-alt',
  category: 'media',
  example: {},
  attributes: {
    caption: {
      type: 'string',
      source: 'html',
      selector: 'figcaption',
      default: '',
    },
    imgAlt: {
      type: 'string',
      default: '',
    },
    mediaId: {
      type: 'number',
      default: 0,
    },
    mediaLargeUrl: {
      type: 'string',
      source: 'attribute',
      attribute: 'src',
      selector: 'img',
      default: '',
    },
    mediaUrl: {
      type: 'string',
      source: 'attribute',
      attribute: 'src',
      selector: 'img',
      default: '',
    },
    className: 'pss-media-uploader',
  },
  edit: ({ attributes, setAttributes }) => {
    const blockProps = useBlockProps();

    const onSelectImage = ( media ) => {
      setAttributes( {
        mediaUrl: media.sizes.medium.url,
        mediaLargeUrl: media.sizes.large.url,
        mediaId: media.id,
        imgAlt: media.alt,
      } );
    };

    const onChangeImgAlt = ( imgAlt ) => {
      setAttributes( { imgAlt } );
    }

    const onChangeCaption = ( caption ) => {
      setAttributes( { caption } );
    }

    debugger;
    return ( <div { ...blockProps }>
      { attributes.mediaId>0? <img src={attributes.mediaUrl} alt={__('Selected image','pss-blocks')} /> : null }
      <div className='image-controls'>
        <MediaUploadCheck>
          <MediaUpload allowedTypes={ ['image', 'video'] } value={attributes.mediaId} onSelect={onSelectImage} render={ ( {open} ) => (<Button className='button button-large' onClick={ open }>
            { ! attributes.mediaId ? __( 'Upload Image', 'pss-blocks' ) : __( 'Change Image', 'pss-blocks' ) }
          </Button>)} />
        </MediaUploadCheck>
        { attributes.mediaId>0? <hr className='separator' /> : null }
        { attributes.mediaId>0? <p className='label'>Edit image alt (optional). Remember, every image should have an <i>alt</i> attribute unless it serves purely as background.</p> : null }
        { attributes.mediaId>0? <PlainText value={ attributes.imgAlt } onChange={onChangeImgAlt} tagName='textarea' placeholder={ __('Alt text for better SEO') } /> : null }
        { attributes.mediaId>0? <hr className='separator' /> : null }
        { attributes.mediaId>0? <p className='label'>Add/edit image caption (optional).</p> : null }
        { attributes.mediaId>0? <PlainText value={ attributes.caption } onChange={onChangeCaption} tagName='textarea' placeholder={ __('Caption text') } /> : null }
      </div>
    </div> );
  },
  save: ({ attributes}) => {
    const blockProps = useBlockProps.save();
    return ( <div { ...blockProps }>
      {attributes.mediaUrl && <figure><img src={attributes.mediaLargeUrl} alt={attributes.imgAlt? attributes.imgAlt : __('Uploaded image', 'pss-blocks')} /><figcaption>{ attributes.caption }</figcaption></figure>}
    </div> );
  },
} );