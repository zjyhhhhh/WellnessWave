import "@testing-library/jest-dom";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import AllFeedScreen from "../../src/screens/AllFeedScreen";
import ThumbsButton from "../../src/components/ThumbsButton";
import  {AntDesign} from '@expo/vector-icons';

describe('AllFeedScreen', () => {
    it('renders correctly', () => {
      const { getByText, getByTestId } = render(<AllFeedScreen />);
      // check if one of the posts get rendered correctly
      expect(getByText('Ashley')).toBeTruthy();
      expect(getByText('Doin outdoor yoga #fitness #chill #mountain')).toBeTruthy();
      expect(getByTestId('postPersonImage-0')); 
      expect(getByTestId('postImage-0'));
      expect(getByText("Doin outdoor yoga #fitness #chill #mountain"));
      expect(getByText("72"));
      expect(getByText("3"));
    });

    it('mock the action of pressing LIKE button', async () => {
        const {getByText, getByTestId } = render(<AllFeedScreen />);
        fireEvent.press(getByTestId("testThumbUpButton-0"));
        expect(getByText("73")).toBeTruthy();
    });

    it('mock the action of pressing DISLIKE button', async () => {
        const {getByText, getByTestId } = render(<AllFeedScreen />);
        fireEvent.press(getByTestId("testThumbDownButton-0"));
        expect(getByText("4")).toBeTruthy();
    });
});

