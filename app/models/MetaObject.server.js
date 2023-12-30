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

export async function createMetaObjectEntry(graphql) {
    const response = await graphql(
    `#graphql
    mutation CreateMetaobject($metaobject: MetaobjectCreateInput!) {
        metaobjectCreate(metaobject: $metaobject) {
        metaobject {
            handle
            season: field(key: "season") {
            value
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
            "metaobject": {
                "type": "tag_discounts",
                "handle": "discount1",
                "fields": [
                    {
                        "key": "tag_name",
                        "value": "50OFF"
                    },
                    {
                        "key": "discount_rate",
                        "value": "50"
                    }
                ]
            }
        },
    },
    );

    const data = await response.json();
    return data;
}