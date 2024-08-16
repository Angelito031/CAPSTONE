import {FaSearch} from 'react-icons/fa'

const SearchBox = ({searchQuery, handleInputChange, handleSubmit, wsize}) => {
  return (
    <form onSubmit={handleSubmit} className={`relative mr-4 ${wsize} w-fit`}>
        <input
        type="text"
        id="job-field"
        name="search"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder='Search A Job...'
        className="w-full rounded border border-gray-300 bg-gray-100 bg-opacity-50 px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200"
        />
        <FaSearch className="absolute right-0 top-0 my-2 mr-4 h-6 w-6 text-gray-400" />
    </form>
)
}

export default SearchBox