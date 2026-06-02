import type { FeatureProvider } from '@payloadcms/richtext-lexical'
import type { RichTextField } from 'payload/types'

import { ParagraphFeature, UploadFeature, lexicalEditor } from '@payloadcms/richtext-lexical'

import { defaultPublicDemoFeatures } from './defaultFeatures'
import deepMerge from '../../utils/object'
import { link } from '../link'

type RichText = (
  overrides?: Partial<RichTextField>,
  additions?: {
    features?: FeatureProvider[]
  },
) => RichTextField

export const richText: RichText = (
  overrides,
  additions = {
    features: [],
  },
) =>
  deepMerge<RichTextField, Partial<RichTextField>>(
    {
      label: false,
      name: 'richText',
      type: 'richText',
      admin: {
        disableListColumn: true,
        disableListFilter: true,
      } as any,
      editor: lexicalEditor({
        features: () => [
          ...[...defaultPublicDemoFeatures, ...(additions.features || [])],
          UploadFeature({
            collections: {
              media: {
                fields: [
                  {
                    name: 'caption',
                    type: 'richText',
                    editor: lexicalEditor({
                      features: () => [ParagraphFeature(), ...defaultPublicDemoFeatures],
                    }),
                    label: 'Caption',
                  },
                  {
                    name: 'alignment',
                    type: 'radio',
                    label: 'Alignment',
                    options: [
                      {
                        label: 'Left',
                        value: 'left',
                      },
                      {
                        label: 'Center',
                        value: 'center',
                      },
                      {
                        label: 'Right',
                        value: 'right',
                      },
                    ],
                  },
                  {
                    name: 'enableLink',
                    type: 'checkbox',
                    label: 'Enable Link',
                  },
                  link({
                    appearances: false,
                    disableLabel: true,
                    overrides: {
                      admin: {
                        condition: (_: unknown, data: Record<string, any>) =>
                          Boolean(data?.enableLink),
                      },
                    },
                  }),
                ],
              },
            },
          }),
        ],
      }),
      localized: true,
    },
    overrides || {},
  )
