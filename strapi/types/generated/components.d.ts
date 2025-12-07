import type { Schema, Struct } from '@strapi/strapi';

export interface CardsCoreCard extends Struct.ComponentSchema {
  collectionName: 'components_cards_core_cards';
  info: {
    displayName: 'CoreCard';
  };
  attributes: {
    title: Schema.Attribute.String;
    url: Schema.Attribute.String;
    urlDescription: Schema.Attribute.String;
  };
}

export interface FooterFooterMenuItem extends Struct.ComponentSchema {
  collectionName: 'components_footer_footer_menu_items';
  info: {
    description: '';
    displayName: 'FooterMenu';
  };
  attributes: {
    isIconMenu: Schema.Attribute.Boolean;
    menu: Schema.Attribute.Component<'footer.menu-item', true>;
    menuTitle: Schema.Attribute.String;
  };
}

export interface FooterMenuItem extends Struct.ComponentSchema {
  collectionName: 'components_footer_menu_items';
  info: {
    description: '';
    displayName: 'MenuItem';
  };
  attributes: {
    color: Schema.Attribute.String;
    icon: Schema.Attribute.String;
    loggedInUrl: Schema.Attribute.String;
    sort: Schema.Attribute.Integer;
    title: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface ModalsConfirmationModal extends Struct.ComponentSchema {
  collectionName: 'components_modals_confirmation_modals';
  info: {
    description: '';
    displayName: 'ConfirmationModal';
  };
  attributes: {
    cancel: Schema.Attribute.String;
    confirmation: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface VideoConnectVideo extends Struct.ComponentSchema {
  collectionName: 'components_video_connect_videos';
  info: {
    description: '';
    displayName: 'ConnectVideo';
  };
  attributes: {
    description: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    url: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'cards.core-card': CardsCoreCard;
      'footer.footer-menu-item': FooterFooterMenuItem;
      'footer.menu-item': FooterMenuItem;
      'modals.confirmation-modal': ModalsConfirmationModal;
      'video.connect-video': VideoConnectVideo;
    }
  }
}
