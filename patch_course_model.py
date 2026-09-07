import re
with open('backend/src/modules/courses/course.model.ts', 'r') as f:
    content = f.read()

replacement = """    price: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    discountPrice: {
      type: Number,
      min: 0,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    studentCount: {
      type: Number,
      default: 0,
    },"""
content = re.sub(r'    price: \{\s*type: Number,\s*required: true,\s*min: 0,\s*default: 0,\s*\},', replacement, content)
with open('backend/src/modules/courses/course.model.ts', 'w') as f:
    f.write(content)
