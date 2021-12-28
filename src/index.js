const { registerBlockType } = wp.blocks;
const { useBlockProps, MediaUpload, MediaUploadCheck } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import './index.scss';
import './style.scss';
 
registerBlockType( 'pss-blocks/my-media-uploading-gutenberg-block', {
  apiVersion: 2,
  title: 'Media Uploading Block with ESNext',
  icon: 'images-alt',
  category: 'media',
  example: {},
  attributes: {
    title: {
      type: 'string',
      source: 'html',
      selector: 'figure figcaption',
      default: '',
    },
    mediaId: {
      type: 'number',
      default: 0,
    },
    mediaUrl: {
      type: 'string',
      default: '',
    },
    className: 'my-media-uploading-gutenberg-block',
  },
  edit: ({ attributes, setAttributes }) => {
    const blockProps = useBlockProps();

    const onSelectImage = ( media ) => {
      setAttributes( {
        mediaUrl: media.url,
        mediaId: media.id,
      } );
    };
    console.log(wp);
    return ( <div { ...blockProps }>
      <MediaUploadCheck>
        <MediaUpload allowedTypes={ ['image', 'video'] } value={attributes.mediaId} onSelect={onSelectImage} render={ ( {open} ) => (<Button className={ attributes.mediaId==0? 'image-button' : 'button button-large' } onClick={ open }>
          { ! attributes.mediaId ? __( 'Upload Image', 'pss-blocks' ) : <figure><img src={attributes.mediaUrl} alt={__('Uploaded image', 'pss-blocks')} /><figcaption>{ __( 'Change Image', 'pss-blocks' ) }</figcaption></figure> }
        </Button>)} />
      </MediaUploadCheck>
    </div> );
  },
  save: ({ attributes}) => {
    const blockProps = useBlockProps.save();
    return ( <div { ...blockProps }>
      {attributes.mediaUrl && <img src={attributes.mediaUrl} alt={__('Uploaded image', 'pss-blocks')} />}
    </div> );
  },
} );