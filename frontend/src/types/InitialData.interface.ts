import {Sticker} from "@/types/Sticker.interface";
import {Badge} from "@/types/Badge.interface";
import {AboutData} from "@/types/AboutData.interface";
import {IVideoCardMedium} from "@/types/VideoCardMedium.interface";
import {IInteractiveStudy} from "@/types/InteractiveStudy.interface";
import {Footer} from "@/types/Footer.interface";
import {Page} from "@/types/Page.interface";
import {ImageCard} from "@/types/ImageCard.interface";
import {Menu} from "@/types/Menu.interface";
import {ImageAndText} from "@/types/ImageAndText.Interface";
import {BibleStudyType} from "@/types/BibleStudyType.interface";
import {SeedStudyCard} from "@/types/SeedStudyCard.interface";
import {FeaturedStudy} from "@/types/FeaturedStudy.interface";

export interface InitialData {
    badges: Badge[];
    count: number;
    stickers: Sticker[];
    about: AboutData;
    seedStudyCards: SeedStudyCard[];
    seedVideos: IVideoCardMedium[];
    interactiveStudy: IInteractiveStudy;
    featuredStudies: FeaturedStudy[];
    footer: Footer;
    pages: Page[];
    imageCards: ImageCard[];
    imageAndText: ImageAndText[];
    menu: Menu;
    privacyPolicy: string;
    bibleStudyTypes: BibleStudyType[];
}