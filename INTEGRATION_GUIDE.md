# Frontend Integration Guide - Payment & Enrollment System

## 🚀 Complete Integration Setup

### 1. Environment Setup

Create `.env` file in Frontend root:
```env
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
VITE_API_BASE_URL=http://localhost:5000/api/v1
VITE_APP_NAME=Shell Entertainment
```

### 2. New Components Created

#### Payment Components
- `PaymentModal.tsx` - Complete Razorpay payment integration
- `CourseEnrollButton.tsx` - Smart enrollment button with payment
- `EnrolledCourses.tsx` - Display user's enrolled courses
- `EnrolledStudentsAdmin.tsx` - Admin view of enrolled students

#### Services
- `payment.service.ts` - Payment and enrollment API calls

### 3. Integration Examples

#### A. Course Detail Page Integration

```tsx
import CourseEnrollButton from '../components/CourseEnrollButton';
import { useAppSelector } from '../hooks/redux';

const CourseDetailPage = () => {
  const { user, token } = useAppSelector((state) => state.auth);
  
  return (
    <div>
      {/* Course details */}
      <CourseEnrollButton
        course={courseData}
        userInfo={user ? {
          id: user._id,
          name: user.fullName || user.fullNamme,
          email: user.email,
          accountType: user.accountType
        } : null}
        token={token}
        onEnrollmentSuccess={() => {
          // Refresh course data or redirect
          window.location.reload();
        }}
      />
    </div>
  );
};
```

#### B. Student Dashboard Integration

```tsx
import EnrolledCourses from '../components/EnrolledCourses';
import { useAppSelector } from '../hooks/redux';

const StudentDashboard = () => {
  const { token } = useAppSelector((state) => state.auth);
  
  return (
    <div>
      <EnrolledCourses token={token} />
    </div>
  );
};
```

#### C. Admin Dashboard Integration

```tsx
import EnrolledStudentsAdmin from '../components/EnrolledStudentsAdmin';
import { useAppSelector } from '../hooks/redux';

const AdminCourseManagement = ({ courseId }: { courseId: string }) => {
  const { token } = useAppSelector((state) => state.auth);
  
  return (
    <div>
      <EnrolledStudentsAdmin courseId={courseId} token={token} />
    </div>
  );
};
```

### 4. Updated Existing Components

#### CourseEnrollment.tsx
- Integrated with new payment system
- Supports both free and paid courses
- Uses Razorpay for payments

### 5. Payment Flow Implementation

#### Complete Payment Process:
1. **User clicks "Enroll"** → `CourseEnrollButton` or `CourseEnrollment`
2. **Free Course** → Direct enrollment via API
3. **Paid Course** → Opens `PaymentModal`
4. **Payment Modal** → Captures payment, opens Razorpay
5. **Razorpay Success** → Verifies payment, enrolls user
6. **Success** → Sends email, updates UI

### 6. API Integration Status

#### ✅ Implemented Endpoints:
- `POST /payment/capturePayment` - Initialize payment
- `POST /payment/verifyPayment` - Verify and enroll
- `POST /payment/sendPaymentSuccessEmail` - Send confirmation
- `POST /payment/enrollStudent` - Direct enrollment
- `GET /course/getUserEnrolledCourses` - User's courses
- `POST /course/getEnrolledStudents` - Admin view

### 7. Usage Instructions

#### For Course Pages:
```tsx
// Replace existing enrollment buttons with:
<CourseEnrollButton
  course={course}
  userInfo={userInfo}
  token={token}
  onEnrollmentSuccess={() => refetchCourseData()}
/>
```

#### For Student Dashboard:
```tsx
// Add enrolled courses section:
<EnrolledCourses token={token} />
```

#### For Admin Dashboard:
```tsx
// Add student management:
<EnrolledStudentsAdmin courseId={courseId} token={token} />
```

### 8. Required Dependencies

Already included in package.json:
- `axios` - API calls
- `@radix-ui/react-dialog` - Modal components
- `lucide-react` - Icons

### 9. Razorpay Integration

#### HTML Setup (✅ Done):
```html
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
```

#### Environment Variables:
```env
VITE_RAZORPAY_KEY_ID=rzp_test_your_key_id
```

### 10. Error Handling

All components include:
- Loading states
- Error messages
- Toast notifications
- Fallback UI

### 11. Testing Checklist

#### Payment Flow:
- [ ] Free course enrollment
- [ ] Paid course payment modal
- [ ] Razorpay integration
- [ ] Payment success handling
- [ ] Payment failure handling
- [ ] Email notifications

#### User Experience:
- [ ] Enrolled courses display
- [ ] Course progress tracking
- [ ] Admin student management
- [ ] Responsive design
- [ ] Loading states

### 12. Next Steps

1. **Set up Razorpay account** and get API keys
2. **Add environment variables** to `.env`
3. **Update existing course pages** to use new components
4. **Test payment flow** with Razorpay test mode
5. **Implement course progress tracking**
6. **Add course completion certificates**

### 13. File Structure

```
src/
├── components/
│   ├── PaymentModal.tsx          # New
│   ├── CourseEnrollButton.tsx    # New
│   ├── EnrolledCourses.tsx       # New
│   ├── EnrolledStudentsAdmin.tsx # New
│   └── CourseEnrollment.tsx      # Updated
├── service/
│   ├── payment.service.ts        # New
│   └── course.service.ts         # Updated
└── .env.example                  # New
```

### 14. Production Deployment

#### Environment Variables:
```env
VITE_RAZORPAY_KEY_ID=rzp_live_your_live_key
VITE_API_BASE_URL=https://your-api-domain.com/api/v1
```

#### Security Notes:
- Never expose Razorpay secret key in frontend
- Use HTTPS in production
- Validate payments on backend
- Implement proper error logging

This integration provides a complete payment and enrollment system with Razorpay integration, user enrollment tracking, and admin management capabilities.