import { useSelector } from 'react-redux'
import s from './Books.module.scss'
import { RootState } from '../../Redux'
import Book from '../Book/Book'
import { Status } from '../../Redux/Slices/BooksSliceType'



const Books = () => {

    const { items } = useSelector((state: RootState) => state.books.item)



    return (
        <div className="container">
            <div className={s.Books}>
                {
                    Status.SUCCESS && items.map((item, id) => (
                        <Book key={id} {...item} />
                    ))
                    || 'loading'
                }

            </div>
        </div>
    )
}

export default Books