import { FC } from 'react';
import s from './Book.module.scss'
import zamena from '../../Img/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'
import { easeIn, motion } from 'framer-motion'

type BookProps = {
    volumeInfo: {
        authors: string[],
        categories: string[],
        title: string,
        imageLinks: {
            thumbnail: string
        }
    }
}

const textAnimation = {
    hidden: {
        scale:0.5,
        opacity: 0,
    },
    visible: (custom: number) => ({
        scale:1,
        opacity: 1,
        transition: { easeIn, delay: custom * 0.3,duration: 0.4 }
    }),
}

const Book: FC<BookProps> = (props) => {
    const { authors, categories, title, imageLinks } = props.volumeInfo;
    const thumbnail = imageLinks ? imageLinks.thumbnail : '';


    if (authors) {
        authors.slice(0, 1)
    }



    return (
        <motion.div className={s.Book}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.2, once: true }}
        variants={textAnimation}
        custom={0.3}
        >
            <div className={s.Book_img}>
                {
                    thumbnail ? <img className={s.Book_img_item} src={thumbnail} alt='img' /> : <img className={s.Book_img_item} src={zamena} alt='zamena' />
                }
            </div>
            <p className={s.Book_categories}>{categories}</p>
            <p className={s.Book_title}>{title}</p>
            <p className={s.Book_aftor}>{authors}</p>
        </motion.div>
    );
};

export default Book;