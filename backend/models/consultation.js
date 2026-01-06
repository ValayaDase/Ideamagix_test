import mongoose from "mongoose";

const consultationSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true
    },

    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true
    },

    illnessHistory: {
      type: String,
      required: true
    },

    surgeryHistory: {
      type: String
    },

    surgeryTime: {
      type: String
    },

    diabetic: {
      type: String,
      enum: ["Yes", "No"]
    },

    allergies: {
      type: String
    },

    others: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Consultation = mongoose.model("Consultation", consultationSchema);
export default Consultation;
