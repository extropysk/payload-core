import type { FeatureProvider } from '@payloadcms/richtext-lexical'

import {
  AlignFeature,
  BlockQuoteFeature,
  BoldTextFeature,
  CheckListFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  IndentFeature,
  InlineCodeTextFeature,
  ItalicTextFeature,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  RelationshipFeature,
  StrikethroughTextFeature,
  SubscriptTextFeature,
  SuperscriptTextFeature,
  UnderlineTextFeature,
  UnorderedListFeature,
  UploadFeature,
} from '@payloadcms/richtext-lexical'

export const defaultPublicDemoFeatures: FeatureProvider[] = [
  // Text formatting
  BoldTextFeature(),
  ItalicTextFeature(),
  UnderlineTextFeature(),
  StrikethroughTextFeature(),
  SubscriptTextFeature(),
  SuperscriptTextFeature(),
  InlineCodeTextFeature(),

  // Basic blocks
  ParagraphFeature(),
  HeadingFeature({
    enabledHeadingSizes: ['h2', 'h3', 'h4', 'h5', 'h6'],
  }),
  BlockQuoteFeature(),

  // Layout & alignment
  AlignFeature(),
  IndentFeature(),
  HorizontalRuleFeature(),

  // Lists
  UnorderedListFeature(),
  OrderedListFeature(),
  CheckListFeature(),

  // Relationships & links
  LinkFeature({}),
  RelationshipFeature(),

  // Media
  UploadFeature(),
]
