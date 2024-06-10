import { FC } from 'react';
import s from './Book.module.scss'
import zamena from '../../Img/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'

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



const Book: FC<BookProps> = (props) => {
    const { authors, categories, title, imageLinks } = props.volumeInfo;
    const thumbnail = imageLinks ? imageLinks.thumbnail : '';

    const sliceAuthors = authors.slice(0, 1)

    return (
        <div className={s.Book}>
            <div className={s.Book_img}>
                {
                    thumbnail ? <img className={s.Book_img_item} src={thumbnail} alt='img' /> : <img className={s.Book_img_item} src={zamena} alt='zamena' />
                }
            </div>
            <p className={s.Book_categories}>{categories}</p>
            <p className={s.Book_title}>{title}</p>
            <p className={s.Book_aftor}>{sliceAuthors}</p>
        </div>
    );
};

export default Book;