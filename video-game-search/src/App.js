import React from "react";
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import { 
  PagingInfo,
  ResultsPerPage,
  Paging,
  Facet,
  SearchProvider,
  Results,
  SearchBox,
  Sorting,
 } from "@elastic/react-search-ui";
import { Layout } from "@elastic/react-search-ui-views";
import "@elastic/react-search-ui-views/lib/styles/styles.css";

const connector = new AppSearchAPIConnector({
  searchKey: process.env.REACT_APP_SEARCH_KEY,
  engineName: "video-games",
  hostIdentifier: process.env.REACT_APP_HOST_ID,
});

const configurationOptions = {
  apiConnector: connector,
  searchQuery: {
    search_fields: {
      name: {}
    },
    result_fields: {
      name: {
        snippet: {
          size: 75,
          fallback: true
        }
      },
      genre: {
        snippet: {
          size: 50,
          fallback: true
        }    
      },
      publisher: {
        snippet: {
          size: 50,
          fallback: true
        }
      },
      critic_score: {
        raw: {}
      },
      user_score: {
        raw: {}
      },
      platform: {
        snippet: {
          size: 50,
          fallback: true
        } 
      },
      image_url: {
        raw: {}
      },  
    },
    facets: {
      user_score: {
        type: "range",
        ranges: [
          { from: 0, to: 5, name: "Not good" },
          { from: 5, to: 7, name: "Not bad" },
          { from: 7, to: 9, name: "Pretty good" },
          { from: 9, to: 10, name: "Must play!" }
        ],    
      },
      critic_score: {
        type: "range",
        ranges: [
          { from: 0, to: 50, name: "Not good" },
          { from: 50, to: 70, name: "Not bad" },
          { from: 70, to: 90, name: "Pretty good" },
          { from: 90, to: 100, name: "Must play!" },
        ]
      },
      genre: { type: "value", size: 100 },
      publisher: { type: "value", size: 100 },
      platform: { type: "value", size: 100 },
    }
  },
  autocompleteQuery: {
    suggestions: {
      types: {
        documents: {
          fields: ["name"]
        }
      },
      size: 5
    },
  }
};

function App() {
  return (
    <SearchProvider config={configurationOptions}>
      <div className="App">
        <Layout
          header={<SearchBox autocompleteSuggestions />}
          bodyContent={<Results titleField="name" urlField="image_url" />}
          sideContent={
            <div>
                <Sorting
                    label={"Sort by"}
                    sortOptions={[
                      {
                        name: "Relevance",
                        value: "",
                        direction: ""
                      },
                      {
                        name: "Name",
                        value: "name",
                        direction: "asc"
                      }
                    ]}
                  />
                  <Facet field="user_score" label="User Score" />
                  <Facet field="critic_score" label="Critic Score" />
                  <Facet field="genre" label="Genre" />
                  <Facet field="publisher" label="Publisher" isFilterable={true} />
                  <Facet field="platform" label="Platform" />
                </div>
          }
          bodyHeader={
            <>
              <PagingInfo />
              <ResultsPerPage />
            </>
          }
          bodyFooter={<Paging />}
        />
      </div>
    </SearchProvider>
  );
}

export default App;
