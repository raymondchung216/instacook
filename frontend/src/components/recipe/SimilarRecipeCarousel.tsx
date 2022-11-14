import React from 'react'

import { Divider, Typography } from '@mui/material'
import RecipeCard from '../RecipeCard'
import Slider from "react-slick";
import DiscoveryCardLoader from '../RecipeCardPlaceholder'
import { RecipeThumbnail } from '../../types/instacook-types';
import { Category } from '@mui/icons-material';

type Props = {
  // title of the carousel
  heading: string,

  // id of the recipe
  recipeId: string,
}

const sliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 6,
  vertical: false,

  // mui default breakpoints
  // xs, extra-small: 0px
  // sm, small: 600px
  // md, medium: 900px
  // lg, large: 1200px
  // xl, extra-large: 1536px
  responsive: [
    {
      breakpoint: 1536,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      },
    },
    {
      breakpoint: 400,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      },
    },
  ],
};

const carouselStyles = {
  backgroundColor: 'white',
  padding: 48,
  paddingTop: 32,
  paddingBottom: 32,
  borderBottom: '1px solid #eeeeee'
}

// recommended placeholder
const recommendedList: RecipeThumbnail[] = [
  {
    _id: "666",
    contributorUsername: "Jackson",
    title: "Recomended 1",
    content: '["A","A"],["A","A"],["A","A"]',
    numberLike: 60,
    tags: ["Tag1", "Tag2", "Tag3"],
    image: "https://m.media-amazon.com/images/I/81BZGx1Rz9L.jpg",
  },
  {
    _id: "666",
    contributorUsername: "Jackson",
    title: "Recomended 1",
    content: '["A","A"],["A","A"],["A","A"]',
    numberLike: 60,
    tags: ["Tag1", "Tag2", "Tag3"],
    image: "https://m.media-amazon.com/images/I/81BZGx1Rz9L.jpg",
  },
  {
    _id: "666",
    contributorUsername: "Jackson",
    title: "Recomended 1",
    content: '["A","A"],["A","A"],["A","A"]',
    numberLike: 60,
    tags: ["Tag1", "Tag2", "Tag3"],
    image: "https://m.media-amazon.com/images/I/81BZGx1Rz9L.jpg",
  }
]

const placeholderArr = [0, 1, 2, 3, 4, 5];

const SimilarRecipeCarousel = (props: Props) => {
  const [recipes, setRecipes] = React.useState<RecipeThumbnail[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const getRecipes = async () => {
      const body = {
        query: `
          query {
            getListRecipeByTags(tags: ["${props.recipeId}"]) {
              _id
              contributorUsername
              title
              content
              numberLike
              tags
              image
            }
          }
        `
      }

      const res = await fetch('http://localhost:3000/graphql', {
        body: JSON.stringify(body),
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const apiData = await res.json();

      if (apiData.errors) {
        throw new Error(apiData.errors[0].message);
      }

      setRecipes([...apiData.data.getListRecipeByTags]);

      if (props.recipeId !== undefined) {
        // all api calls are done
        setLoading(false);
        console.log([...apiData.data.getListRecipeByTags]);
      }
    }
    getRecipes();
  }, [props.recipeId])


  return (
    <div style={carouselStyles}>
      <Typography variant="h5" style={{ paddingBottom: 4 }}>{props.heading}</Typography>
      <Slider {...sliderSettings}>
        {loading && placeholderArr.map((index) => (
          <DiscoveryCardLoader key={index} />
        ))}

        {recipes.map((recipe, idx) => (
          !loading && <RecipeCard key={idx} title={recipe.title} author={recipe.contributorUsername} img={recipe.image} numberOfLikes={recipe.numberLike} recipeId={recipe._id} />
        ))}
      </Slider>
    </div>
  )
}

export default SimilarRecipeCarousel