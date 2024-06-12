import { render, screen } from "@testing-library/react"
import SearchResult from '../../src/Components/Chat/SearchResult'
import {IUser} from "../../src/Types/UsersTypes"
import { describe, expect, it } from "vitest"
// import { expect } from "vitest"
describe('UserAccount', () => {
    it('should render  userName', () => {
        const user: IUser = { _id: "12", userName: 'David' }
        
        render(<SearchResult _id={ user._id } userName={ user.userName } />)

        const show = screen.getByText('David')
        expect(show).toBeInTheDocument()
    })
})