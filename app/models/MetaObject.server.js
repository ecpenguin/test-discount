import invariant from "tiny-invariant";
import db from "../db.server";

export async function createMetaObjectDefinition(graphql) {
  
    const response = await graphql(
        `#graphql
        mutation CreateMetaobjectDefinition($definition: MetaobjectDefinitionCreateInput!) {
          metaobjectDefinitionCreate(definition: $definition) {
            metaobjectDefinition {
              name
              type
              fieldDefinitions {
                name
                key
              }
            }
            userErrors {
              field
              message
              code
            }
          }
        }`,
        {
          variables: {
            "definition": {
              "name": "Tag Discounts",
              "type": "tag_discounts",
              "fieldDefinitions": [
                { 
                    "key": "tag_name", 
                    "name": "Tag Name", 
                    "type": "single_line_text_field" 
                },
                { 
                    "key": "discount_rate", 
                    "name": "Discount Rate", 
                    "type": "number_integer" 
                }
              ]
            }
          },
        },
    );
  
    const data = await response.json();
    
    return data;
  }